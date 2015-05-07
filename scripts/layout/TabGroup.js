import React, {PropTypes} from 'react';
import capitalize from 'lodash/string/capitalize';

const TabGroup = React.createClass({
  propTypes: {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired
  },
  getInitialState() {
    return {
      active: 0
    };
  },
  tabEl(str, i) {
    let classes = i === Number(this.state.active) ? 'active' : '';
    return (
      <li key={`tab_${str}`} role='presentation' className={classes}>
        <a  href='#'
            aria-controls={str}
            role='tab'
            data-index={i}>
          {capitalize(str)}
        </a>
      </li>
    );
  },
  contentEl(data, i) {
    let classes = 'tab-pane',
        name = this.props.tabs[i];
    classes += i === Number(this.state.active) ? ' active' : ''
    return (
      <div  key={`content_${name}`}
            role='tabpanel'
            className={classes}
            id={name}>
        {data}
      </div>
    );
  },
  tabClick(e) {
    e.preventDefault();
    let target = e.target;
    if (target.tagName === 'A') {
      this.setState({
        active: target.dataset.index
      });
    }
  },
  render() {
    let tabs = this.props.tabs.map(this.tabEl),
        content = this.props.children.map(this.contentEl);
    return (
      <div role='tabpanel'>
        <ul className='nav nav-pills' role='tablist' onClick={this.tabClick}>
          {tabs}
        </ul>
        <div className='tab-content'>
          {content}
        </div>
      </div>
    );
  }
});

export default TabGroup;
