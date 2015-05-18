import React, {PropTypes} from 'react';

import Column from './layout/Column';

import AutoSearch from './AutoSearch';

const style = {
  position: 'absolute',
  zIndex: 2,
  boxShadow: '2px 2px 2px lightgrey'
}

const Autocomplete = React.createClass({
  propTypes: {
    value: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    handleChange: PropTypes.func.isRequired,
    autocomplete: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired
  },
  onClick(e) {
    let {target: {tagName, text}} = e;
    e.preventDefault();
    if (tagName !== 'A') return;
    this.props.handleSelect(text);
  },
  render() {
    let {value, handleChange, autocomplete} = this.props;
    const suggestions = this.props.suggestions.map((suggest, i) => {
      return (
        <a href='#' className='list-group-item' key={i}>{suggest}</a>
      );
    });
    return (
      <Column cols={{small: 9}} offset={{small: 3}}>
        <AutoSearch
          value={value}
          placeholder='Enter an address for suggestions'
          handleChange={handleChange}
          search={autocomplete} />
        {suggestions.length > 0 ?
          <div
            onClick={this.onClick}
            style={style}
            className='list-group'>
            {suggestions}
          </div> :
          ''
        }
      </Column>
    );
  }
});

export default Autocomplete;
