import React from 'react';
import {Link} from 'react-router';

import UserActions from '../actions/UserActions';

const MenuLink = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ])
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  render() {
    let {router} = this.context;
    let isActive = router.isActive(this.props.to, this.props.params, this.props.query);
    let classes = isActive ? 'active' : '';
    return (
      <li className={classes}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    );
  }
});

const Header = React.createClass({
  render() {
    let loggedIn = false;
    let loginLink = (() => {
      if (this.props.currentUser === false) {
        return (
          <MenuLink to={'login'}>Login</MenuLink>
        );
      } else {
        return (
          <MenuLink to='dashboard' onClick={() => { UserActions.logout(); }}>Logout</MenuLink>
        );
      }
    })();
    if (this.props.currentUser !== false)
      loggedIn = true;
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='dashboard' className='navbar-brand'>
              CRM
            </Link>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-left'>
              <MenuLink to='contacts'>
                Contacts
              </MenuLink>
              <MenuLink to='leads'>
                Leads
              </MenuLink>
              <li className='dropdown'>
                <a href='#'>Inventory <span className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <li><a href='#'>Diamonds</a></li>
                  <li><a href='#'>Rings</a></li>
                  <li><a href='#'>Consignment</a></li>
                </ul>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              {loginLink}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

export default Header;
