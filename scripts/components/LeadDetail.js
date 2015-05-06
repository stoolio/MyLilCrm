import React from 'react';
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
  propTypes: {
    lead: React.PropTypes.object.isRequired,
    subject: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    subjectChange: React.PropTypes.func.isRequired,
    contentChange: React.PropTypes.func.isRequired,
    createNote: React.PropTypes.func.isRequired
  },
  addNote(e) {
    e.preventDefault();
    let note = React.findDOMNode(this.refs.note);
    let heading = React.findDOMNode(this.refs.noteHeading);
    this.props.createNote({
      subject: heading.value,
      content: note.value
    });
  },
  render() {
    if(Object.keys(this.props.lead).length === 0) return (
      <h1>Loading...</h1>
    );

    let {contact, budget, comments, notes} = this.props.lead;
    let fullName = isNull(contact) ?
      'Deleted Contact' :
      `${contact.name.first}, ${contact.name.last}`;

    notes = notes.reverse().map(note => {
      return (
        <a key={note._id} className='list-group-item'>
          <h4 className='list-group-item-heading'>
            {note.subject + ' - ' + moment(note.createdAt).fromNow()}
            <span className='text-capitalize' style={{positon:'absolute',right:20}}>{this.props.users[note.user]}</span>
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
        <h2>{fullName}</h2>
        <h3>Budget: {price(budget.from)}-{price(budget.to)}</h3>
        <div className='panel panel-default'>
          <div className='panel-heading'>Comments</div>
          <div className='panel-body'>{comments}</div>
        </div>
        <hr />
        <form className='form-horizontal'>
          <Field  ref='noteHeading'
                  value={this.props.subject}
                  name=''
                  type='text'
                  placeholder='Subject'
                  publishChange={this.props.subjectChange} />
          <Textarea ref='note'
                    value={this.props.content}
                    placeholder='Notes'
                    publishChange={this.props.contentChange} />
          <Submit onClick={this.addNote} />
        </form>
        <div className='list-group'>
          {notes}
        </div>
      </div>
    );
  }
});

export default LeadDetail;
