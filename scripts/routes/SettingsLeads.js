import React from 'react';

import Field from '../components/Field';
import Submit from '../components/Submit';
import LeadStageList from '../components/LeadStageList';

import FormMixin from '../actions/FormMixin';
import SettingsActions from '../actions/SettingsActions';

const SettingsLeads = React.createClass({
  mixins: [FormMixin.Field('settingsStages', 'newStage')],
  componentWillMount() {
    SettingsActions.load();
  },
  onRemove(id) {
    SettingsActions.leadStage('$remove', id);
  },
  onSubmit() {
    SettingsActions.leadStage('$add', {
      name: this.state.newStage
    });
  },
  render() {
    return (
      <div>
        <h1>Lead Stages</h1>
        <LeadStageList stages={this.props.leadStages} onRemove={this.onRemove} />
        <form>
          <Field  value={this.value}
                  name='Add Stage'
                  type='text'
                  placeholder='New Lead Stage' />
          <Submit onClick={this.onSubmit}>
            Add
          </Submit>
        </form>
      </div>
    );
  }
});

export default SettingsLeads;
