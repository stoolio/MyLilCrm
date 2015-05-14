import express from 'express';
import mongoose from 'mongoose';

let Lead = mongoose.model('Lead');

export default {
  load(req, res, next, id) {
    Lead.findById(id).populate('contact stage').exec((err, lead) => {
      if(err) return next(err);
      if(!lead) return next(new Error('not found'));
      req.lead = lead;
      next();
    });
  },

  index(req, res) {
    Lead.find()
      .select('budget createdAt contact stage')
      .populate('contact stage')
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

  // new(req, res) {},

  create(req, res) {
    let lead = new Lead(req.body);
    lead.save((err, newLead) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        newLead.populate('contact stage', (err, result) => {
          res.json({lead: result});
        });
      }
    });
  },

  createNote(req, res) {
    let lead = req.lead;
    lead.notes.push(req.body);
    lead.save((err, lead) => {
      if (err) {
        console.log(err);
        res.json({error: err})
      } else {
        res.json({lead: lead});
      }
    });
  },

  show(req, res) {
    res.json({lead: req.lead});
  },

  // edit(req, res) {},

  update(req, res) {
    let lead = req.lead;
    lead.findOneAndUpdate({_id: req.lead.id}, req.body)
      .exec((err, updatedLead) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({lead: updatedLead});
        }
      });
  },

  destroy(req, res) {
    let lead = req.lead;
    Lead.remove({_id: lead.id}, (err) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({info: 'Deleted Lead sucessfully'});
      }
    });
  }
};
