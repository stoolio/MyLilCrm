import express from 'express';
import mongoose from 'mongoose';

let Contact = mongoose.model('Contact');

export default {
  load: (req, res, next, id) => {
    Contact.findOne({ _id: id })
      .select('name email phone address.street address.city address.state address.zip')
      .exec((err, contact) => {
        if(err) return next(err);
        if(!contact) return next(new Error('not found'));
        req.contact = contact;
        next();
      });
  },
  index: (req, res) => {
    Contact.find()
      .select('name email phone address.state')
      .sort({'name.last': 'asc'})
      .exec((err, contacts) => {
        if(err) {
          console.log(err);
          res.json({error: '500'});
        } else {
          res.json({contacts: contacts, count: contacts.length});
        }
      });
  },
  // new: (req, res) => {},
  create: (req, res) => {
    let contact = new Contact(req.body);
    contact.save((err, newContact) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({contact: newContact});
      }
    });
  },
  show: (req, res) => {
    res.json({contact: contact});
  },
  // edit: (req, res) => {},
  update: (req, res) => {
    let contact = req.contact;
    let id = contact._id;
    delete contact._id;
    contact.findOneAndUpdate({_id: id}, contact)
      .exec((err, updatedContact) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({contact: updatedContact});
        }
      });
  },
  destroy: (req, res) => {
    let contact = req.contact;
    contact.remove((err) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({success: 'Deleted sucessfully'});
      }
    });
  }
};
