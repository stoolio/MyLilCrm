import React, {PropTypes} from 'react';

import SettingsActions from '../actions/SettingsActions'

import LeadStageItem from './LeadStageItem';

let styles = {
  perspective: 1000,
};

const LeadStageList = React.createClass({
  propTypes: {
    stages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemove: PropTypes.func.isRequired
  },
  setDragged(id) {
    this.dragged = id;
  },
  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.over === e.target.dataset.id) return;
    this.over = e.target.dataset.id;
    SettingsActions.leadStage('$sort', {
      from: this.dragged,
      to: this.over
    });
  },
  finishDrag() {
    SettingsActions.leadStage('$sort', {
      from: this.dragged,
      to: this.over,
      commit: true
    });
  },
  render() {
    let stages = this.props.stages.map(stage => {
      return (
        <LeadStageItem  key={stage._id}
                        stage={stage}
                        setDragged={this.setDragged}
                        finishDrag={this.finishDrag}
                        onRemove={this.props.onRemove} />
      );
    });
    return (
      <ul onDragOver={this.onDragOver} style={styles} className='list-group'>
        {stages}
      </ul>
    );
  }
});

export default LeadStageList;
