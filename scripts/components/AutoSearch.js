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
    this.throttledSearch = throttle(searchStr => {
      this.props.search(searchStr);
    }, this.props.delay);
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
      <Field value={value.length === 0 ? this.state.value : value} type='text' placeholder={placeholder} publishChange={this.handleChange} />
    );
  }
});

export default AutoSearch;
