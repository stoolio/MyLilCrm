import express from 'express';
import mongoose from 'mongoose';

let Contact = mongoose.model('Contact');

export default {
  load: (req, res, next, id) => {
    Contact.findOne({ _id: id }, (err, contact) => {
      if(err) return next(err);
      if(!contact) return next(new Error('not found'));
      req.contact = contact;
      next();
    });
  },
  index: (req, res) => {
    Contact.find()
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
    let {fullName, phone, email} = req.body;
    let contact = new Contact();
    contact.fullName = fullName;
    contact.phone = phone;
    contact.email = email;
    contact.save((err, newContact) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({
          flash: {info: 'Successfully created article'},
          contact: newContact
        });
      }
    });
  },
  // show: (req, res) => {},
  // edit: (req, res) => {},
  update: (req, res) => {
    let contact = req.contact;
    let id = contact._id;
    delete contact._id;
    contact.findOneAndUpdate({_id: id}, contact)
      .exec((err) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({flash: {info: 'Successfully updated article'}});
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
        res.json({
          flash: {info: 'Deleted sucessfully'}
        });
      }
    });
  }
};
