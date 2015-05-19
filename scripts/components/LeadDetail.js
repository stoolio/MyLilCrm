import React, {PropTypes} from 'react';
import {PureRenderMixin} from 'react/addons';
import moment from 'moment';

import isNull from 'lodash/lang/isNull';

import Textarea from './Textarea';
import Field from './Field';
import Submit from './Submit';

// contact: { type: ObjectId, ref: 'Contact' },
// budget: {
//   from: { type: Number, min: 0 },
//   to: { type: Number, min: 0 }
// },
// comments: { type: String },
// diamond: diamondRequestSchema,
// setting: {
//   images: [String],
//   style: String,
//   metal: {
//     quality: Enum(validMetalQualities),
//     color: Enum(validMetalColors)
//   }
// },
// notes: [noteSchema]

function price(num) {
  let price = num.toString().replace(/(\d)(?=(\d{3})+$)/, '$1,');
  return `$${price}`;
}

const LeadDetail = React.createClass({
  mixin: [PureRenderMixin],
  propTypes: {
    users: PropTypes.arrayOf(PropTypes.object),
    lead: PropTypes.object.isRequired,
    subject: PropTypes.func.isRequired,
    content: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired
  },
  render() {
    if(Object.keys(this.props.lead).length === 0) return (
      <h1>Loading...</h1>
    );
    const {contact, stage, budget, comments, notes} = this.props.lead;
    const leadStage = !stage ? 'None' : stage.name;
    const fullName = isNull(contact) ?
      'Deleted Contact' :
      `${contact.name.first}, ${contact.name.last}`;

    const noteList = notes.slice().reverse().map(note => {
      return (
        <a key={note._id} className='list-group-item'>
          <h4 className='list-group-item-heading'>
            {note.subject + ' - ' + moment(note.createdAt).fromNow()}
            <span className='text-capitalize' style={{position:'absolute',right:20}}>{this.props.users[note.user]}</span>
          </h4>
          <hr />
          <p className='list-group-item-text'>
            {note.content}
          </p>
        </a>
      )
    })

    return (
      <div>
        <h2>{fullName} <small style={{float: 'right'}}>{leadStage}</small></h2>
        <h3>Budget: {price(budget.from)}-{price(budget.to)}</h3>
        <div className='panel panel-default'>
          <div className='panel-heading'>Comments</div>
          <div className='panel-body'>{comments}</div>
        </div>
        <hr />
        <form className='form-horizontal'>
          <Field
            ref='noteHeading'
            value={this.props.subject}
            name=''
            type='text'
            placeholder='Subject' />
          <Textarea
            ref='note'
            value={this.props.content}
            placeholder='Notes' />
          <Submit onClick={this.props.createNote} />
        </form>
        <div className='list-group'>
          {noteList}
        </div>
      </div>
    );
  }
});

export default LeadDetail;
