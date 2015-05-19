import React, {PropTypes} from 'react';
import {Navigation, Link} from 'react-router';

import UserActions from '../../actions/UserActions';

import ListLink from './ListLink';

// <li className='dropdown'>
//   <a href='#'>Inventory <span className='caret'></span></a>
//   <ul className='dropdown-menu' role='menu'>
//     <li><a href='#'>Diamonds</a></li>
//     <li><a href='#'>Rings</a></li>
//     <li><a href='#'>Consignment</a></li>
//   </ul>
// </li>

const Header = React.createClass({
  mixins: [Navigation],
  propTypes: {
    currentUser: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ])
  },
  logout() {
    UserActions.logout();
    this.transitionTo('login');
  },
  render() {
    let loginLink = this.props.currentUser === false ?
    (
      <ListLink to='login'>Login</ListLink>
    ) :
    (
      <ListLink to='login' onClick={this.logout}>
        Logout
      </ListLink>
    );
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
              <ListLink to='contacts'>
                Contacts
              </ListLink>
              <ListLink to='leads'>
                Leads
              </ListLink>
              <ListLink to='settings'>
                Settings
              </ListLink>
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
