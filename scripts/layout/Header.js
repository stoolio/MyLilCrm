import React from 'react';
import {Link} from 'react-router';

const MenuLink = React.createClass({
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
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='dashboard' className='navbar-brand'>
              CRM
            </Link>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
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
          </div>
        </div>
      </nav>
    );
  }
});

export default Header;
