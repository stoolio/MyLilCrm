import React from 'react';

import Field from './Field';

import ContactActions from '../actions/ContactActions';

// throttles fn calling only once per delay
// more importantly, it calls fn with the
// last passed arg
function throttle(fn, delay) {
  let queued = false,
      current;
  return val => {
    current = val;
    if(queued) return;
    queued = true;
    setTimeout(() => {
      fn(current);
      queued = false;
    }, delay);
  }
}

let searchContacts = throttle(searchStr => {
  ContactActions.search(searchStr);
}, 500);

const ContactSearch = React.createClass({
  propTypes: {
    displayResults: React.PropTypes.bool,
    contactResults: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      displayResults: false,
      contactResults: []
    };
  },
  getInitialState() {
    return {
      searchStr: ''
    };
  },
  handleChange(val) {
    this.setState({
      searchStr: val
    });
    if (val.length > 2) {
      searchContacts(val);
    } else {
      ContactActions.search('');
    }
  },
  render() {
    // let results = this.props.displayResults ?
    //   (<ul>{
    //     this.props.results.map(result => {
    //       let {name} = result;
    //       return (
    //         <li>{`${name.first} ${name.last}`}</li>
    //       );
    //     })
    //   }</ul>) :
    //   null;

    return (
      <Field value={this.state.searchStr} type='text' placeholder={this.props.placeholder} publishChange={this.handleChange} />
    );
  }
});

export default ContactSearch;
