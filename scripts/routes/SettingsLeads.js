import React from 'react';

import Field from '../components/Field';
import Submit from '../components/Submit';
import LeadStageList from '../components/LeadStageList';

import SettingsActions from '../actions/SettingsActions';

const SettingsLeads = React.createClass({
  getInitialState() {
    return {
      newStage: ''
    };
  },
  componentWillMount() {
    SettingsActions.load();
  },
  handleChange(val) {
    this.setState({
      newStage: val
    });
  },
  onRemove(id) {
    SettingsActions.leadStage('$remove', id);
  },
  onSubmit() {
    SettingsActions.leadStage('$add', {
      name: this.state.newStage
    });
    this.setState({
      newStage: ''
    });
  },
  render() {
    return (
      <div>
        <h1>Lead Stages</h1>
        <LeadStageList stages={this.props.leadStages} onRemove={this.onRemove} />
        <form>
          <Field  value={this.state.newStage}
                  name='Add Stage'
                  type='text'
                  placeholder='New Lead Stage'
                  publishChange={this.handleChange} />
          <Submit onClick={this.onSubmit}>
            Add
          </Submit>
        </form>
      </div>
    );
  }
});

export default SettingsLeads;
