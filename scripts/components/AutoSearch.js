import React, {PropTypes} from 'react';

import Field from './Field';

import throttle from '../lib/throttle';

const AutoSearch = React.createClass({
  propTypes: {
    delay: PropTypes.number,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    search: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      delay: 500,
      placeholder: '',
      minLength: 3
    };
  },
  componentDidMount() {
    let {search, delay} = this.props;
    this.throttledSearch = throttle(search, delay);
  },
  handleChange(e) {
    let { target: {value} } = e;
    if (value.length >= this.props.minLength) {
      this.pendingSearch = this.throttledSearch(value);
    } else {
      this.throttledSearch('');
    }
    this.props.value(value);
  },
  render() {
    let {value, placeholder} = this.props;
    return (
      <div>
        <input
          value={this.props.value()}
          onChange={this.handleChange}
          type='text'
          placeholder={this.props.placeholder}
          className='form-control' />
      </div>
    );
  }
});

export default AutoSearch;
