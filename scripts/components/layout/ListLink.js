import React, {PropTypes} from 'react';
import {Link, State} from 'react-router';

const ListLink = React.createClass({
  mixins: [State],
  propTypes: {
    classes: PropTypes.string
    // all other props passed to Link
  },
  getDefaultProps() {
    return {
      classes: ''
    };
  },
  render() {
    let {classes} = this.props;
    let isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    classes += isActive ? ' active' : '';
    return (
      <li className={classes} role={this.props.role} >
        <Link {...this.props} role={void 0} />
      </li>
    );
  }
});

export default ListLink
