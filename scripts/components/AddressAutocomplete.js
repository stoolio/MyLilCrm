import React, {PropTypes} from 'react';

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
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired
  },
  onClick(e) {
    let {target: {tagName, text}} = e;
    e.preventDefault();
    if (tagName !== 'A') return;
    this.props.onSelect(text);
  },
  render() {
    let {value} = this.props;
    const suggestions = this.props.suggestions.map((suggest, i) => {
      return (
        <a href='#' className='list-group-item' key={i} >{suggest}</a>
      );
    })
    return (
      <div className='col-sm-9 col-sm-offset-3'>
        <AutoSearch value={value}
                    placeholder='Enter an address for suggestions'
                    search={AddressActions.autocomplete} />
        {suggestions.length > 0 ?
          <div onClick={this.onClick} style={style} className='list-group'>
            {suggestions}
          </div> :
          ''
        }
      </div>
    );
  }
});

export default AddressAutocomplete;
