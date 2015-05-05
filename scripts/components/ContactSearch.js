import React from 'react';

import Field from './Field';

import ContactActions from '../actions/ContactActions';

// debounces and calls fn with last passed value
function debounce(fn, delay) {
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

let searchContacts = debounce(searchStr => {
  console.log('firing search action with: ', searchStr);
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
    console.log('handleChange: ', val);
    this.setState({
      searchStr: val
    });
    if (val.length > 1) {
      console.log('searching with: ', val);
      searchContacts(val);
    } else {
      ContactActions.search('');
    }
  },
  render() {
    let results = this.props.displayResults ?
      (<ul>{
        this.props.results.map(result => {
          let {name} = result;
          return (
            <li>{`${name.first} ${name.last}`}</li>
          );
        })
      }</ul>) :
      null;

    return (
      <div>
        <Field value={this.state.searchStr} name='Contact' type='text' placeholder={this.props.placeholder} publishChange={this.handleChange} />
        {results}
      </div>
    );
  }
});

export default ContactSearch;
