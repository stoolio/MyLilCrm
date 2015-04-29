import express from 'express';
import mongoose from 'mongoose';

let Lead = mongoose.model('Lead');

export default {
  load: (req, res, next, id) => {
    Lead.findOne({ _id: id }, (err, lead) => {
      if(err) return next(err);
      if(!lead) return next(new Error('not found'));
      lead.populate('contact')
        .then(function(popLead) {
          req.lead = popLead;
        })
        .catch(function(err) {
          console.log('Uh oh! Population failed, all is lost');
        })
      next();
    });
  },

  index: (req, res) => {
    Lead.find()
      .select('budget createdAt _id')
      .populate('contact', 'name')
      .sort({'createdAt': 'asc'})
      .exec((err, leads) => {
        if(err) {
          console.log(err);
          res.json({error: '500'});
        } else {
          res.json({leads: leads, count: leads.length});
        }
      });
  },

  // new: (req, res) => {},

  create: (req, res) => {
    let lead = new Lead(req.body);
    lead.save((err, newLead) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({lead: newLead});
      }
    });
  },

  show: (req, res) => {
    res.json({lead: req.lead});
  },

  // edit: (req, res) => {},

  update: (req, res) => {
    let lead = req.lead;
    let id = lead._id;
    delete lead._id;
    lead.findOneAndUpdate({_id: id}, lead)
      .exec((err, updatedLead) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({lead: updatedLead});
        }
      });
  },

  destroy: (req, res) => {
    let lead = req.lead;
    lead.remove((err) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({info: 'Deleted sucessfully'});
      }
    });
  }
};
