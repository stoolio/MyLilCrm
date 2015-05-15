import React, {PropTypes} from 'react';

const LeadStageItem = React.createClass({
  propTypes: {
    stage: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    finishDrag: PropTypes.func.isRequired,
    setDragged: PropTypes.func.isRequired
  },
  removeClick(e) {
    e.preventDefault();
    this.props.onRemove(this.props.stage._id);
  },
  // Drag Stuff
  onDragStart(e) {
    e.stopPropagation();
    // add bogus el to use as drag image
    this.shitEl = document.createElement('div');
    this.shitEl.opacity = 0;
    document.body.appendChild(this.shitEl);
    // bogus el

    // add fancy drag styles
    let style = React.findDOMNode(this).style
    style.transform = 'translateZ(50px)';
    style.zIndex = 2;
    // fancy drag styles

    e.dataTransfer.setData('custom', this.props.stage._id);
    e.dataTransfer.setDragImage(this.shitEl, 0, 0);
    e.dataTransfer.effectAllowed = 'move';

    this.props.setDragged(this.props.stage._id);
  },
  onDragEnd(e) {
    // remove bogus el
    this.shitEl.parentElement.removeChild(this.shitEl);
    // bogus el

    // remove fancy drag styles
    let style = React.findDOMNode(this).style
    style.removeProperty('transform');
    style.removeProperty('z-index');
    // fancy drag styles

    this.props.finishDrag();
  },
  // End Drag Stuff
  render() {
    return (
      <li className='list-group-item'
          data-id={this.props.stage._id}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          draggable>
        {this.props.stage.name}
        <a onClick={this.removeClick} style={{float: 'right'}}>
          <span className='glyphicon glyphicon-remove'></span>
        </a>
      </li>
    );
  }
});

export default LeadStageItem;
