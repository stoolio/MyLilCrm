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
    let data = {
      id: this.props.stage._id,
      name: this.props.stage.name
    };

    e.dataTransfer.setData('text', JSON.stringify(data));

    this.props.setDragged(this.props.stage._id);
  },
  onDragEnd(e) {
    this.props.finishDrag();
  },
  // End Drag Stuff
  render() {
    return (
      <li
          className='list-group-item'
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
