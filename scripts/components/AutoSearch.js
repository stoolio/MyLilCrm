import React, {PropTypes} from 'react';

import Field from './Field';

import throttle from '../lib/throttle';

const AutoSearch = React.createClass({
  propTypes: {
    delay: PropTypes.number,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    search: PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      delay: 500,
      placeholder: '',
      minLength: 3
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
      this.throttledSearch(val);
    } else {
      this.props.search('');
    }
  },
  render() {
    return (
      <Field value={this.state.value} type='text' placeholder={this.props.placeholder} publishChange={this.handleChange} />
    );
  }
});

export default AutoSearch;
