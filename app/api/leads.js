import express from 'express';
import mongoose from 'mongoose';

let Lead = mongoose.model('Lead');

export default {
  load: (req, res, next, id) => {
    Lead.findById(id).populate('contact').exec((err, lead) => {
      if(err) return next(err);
      if(!lead) return next(new Error('not found'));
      req.lead = lead;
      next();
    });
  },

  index: (req, res) => {
    Lead.find()
      .select('budget createdAt contact')
      .sort({'createdAt': 'asc'})
      .populate('contact', 'name')
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
        newLead.populate('contact').exec((err, result) => {
          res.json({lead: result});
        });
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
