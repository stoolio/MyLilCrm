import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import ListLink from './ListLink';

const Nav = React.createClass({
  propTypes: {
    type: PropTypes.oneOf(['tabs', 'pills']),
    stacked: PropTypes.bool
  },
  getDefaultProps() {
    return {
      type: 'pills',
      stacked: false
    };
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
          let {name, to, params, query} = nav;
          return (
            <ListLink key={`${name}:${to}`}
                      to={to}
                      params={params}
                      query={query}
                      role='presentation'>
              {name}
            </ListLink>
          );
        })}
      </ul>
    );
  }
});

export default Nav;
