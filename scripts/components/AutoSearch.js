import React, {PropTypes} from 'react';

import Field from './Field';

import throttle from '../lib/throttle';

const AutoSearch = React.createClass({
  propTypes: {
    delay: PropTypes.number,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
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
  getInitialState() {
    return {
      value: ''
    }
  },
  componentDidMount() {
    let {search, delay} = this.props;
    this.throttledSearch = throttle(search, delay);
  },
  handleChange(val) {
    this.setState({
      value: val
    });
    if (val.length >= this.props.minLength) {
      this.pendingSearch = this.throttledSearch(val);
    } else {
      this.throttledSearch('');
    }
  },
  render() {
    let {value, placeholder} = this.props;
    return (
      <Field value={value.length === 0 ? this.state.value : value}
             type='text'
             placeholder={placeholder}
             publishChange={this.handleChange} />
    );
  }
});

export default AutoSearch;
