import React from 'react';

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
    lead: React.PropTypes.object.isRequired
  },
  render() {
    if(Object.keys(this.props.lead).length === 0) return (
      <h1>Loading...</h1>
    );
    let {contact, budget, comments} = this.props.lead;
    let fullName = 'No Name';
    if (contact === undefined) {
      let {name} = contact;
      fullName = `${name.first}, ${name.last}`;
    }

    return (
      <div className='lead'>
        <h2>{fullName}</h2>
        <h3>Budget: {price(budget.from)}-{price(budget.to)}</h3>
        <h3>Comments</h3>
        <p>{comments}</p>
      </div>
    );
  }
});

export default LeadDetail;
