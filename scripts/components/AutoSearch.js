import React, {PropTypes} from 'react';

import Field from './Field';

import throttle from '../lib/throttle';

const AutoSearch = React.createClass({
  propTypes: {
    delay: PropTypes.number,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    handleChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    value: PropTypes.string
  },
  getDefaultProps() {
    return {
      delay: 500,
      placeholder: '',
      minLength: 3,
      value: ''
    };
  },
  componentDidMount() {
    let {search, delay} = this.props;
    this.throttledSearch = throttle(search, delay);
  },
  handleChange(val) {
    if (val.length >= this.props.minLength) {
      this.pendingSearch = this.throttledSearch(val);
    } else {
      this.throttledSearch('');
    }
    this.props.handleChange(val);
  },
  render() {
    let {value, placeholder} = this.props;
    return (
      <Field
        value={value}
        type='text'
        placeholder={placeholder}
        publishChange={this.handleChange} />
    );
  }
});

export default AutoSearch;
