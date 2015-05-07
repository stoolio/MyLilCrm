import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import ListLink from './ListLink';

const Nav = React.createClass({
  propTypes: {
    type: PropTypes.oneOf(['tabs', 'pills']),
    stacked: PropTypes.bool
  },
  render() {
    let {stacked, type} = this.props,
        classes = ['nav'];
    classes.push(`nav-${type}`);
    if (stacked && type === 'pills')
      classes.push('nav-stacked');
    return (
      <ul className={classes.join(' ')}>
        {this.props.children.map(nav => {
          return (
            <ListLink key={nav.to} to={nav.to} role='presentation'>
              {nav.name}
            </ListLink>
          );
        })}
      </ul>
    );
  }
});

export default Nav;
