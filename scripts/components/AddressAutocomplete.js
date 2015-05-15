import React, {PropTypes} from 'react';

import Column from './layout/Column';

import AutoSearch from './AutoSearch';

import AddressActions from '../actions/AddressActions';

const style = {
  position: 'absolute',
  zIndex: 2,
  boxShadow: '2px 2px 2px lightgrey'
}

const AddressAutocomplete = React.createClass({
  propTypes: {
    suggestions: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string
  },
  onClick(e) {
    let {target: {tagName, text}} = e;
    e.preventDefault();
    if (tagName !== 'A' || text === 'No suggestions') return;
    AddressActions.verify(e.target.text);
  },
  render() {
    const suggestions = this.props.suggestions.map((suggest, i) => {
      return (
        <a href='#' className='list-group-item' key={i} >{suggest}</a>
      );
    })
    return (
      <Column cols={{small: 9}} offset={{small: 3}}>
        <AutoSearch value={this.props.value} placeholder='Enter an address for suggestions'
                  search={AddressActions.autocomplete} />
        {suggestions.length > 0 ?
          <div onClick={this.onClick} style={style} className='list-group'>{suggestions}</div> :
          ''
        }
      </Column>
    );
  }
});

export default AddressAutocomplete;
