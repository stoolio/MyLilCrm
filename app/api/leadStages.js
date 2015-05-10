import express from 'express';
import mongoose from 'mongoose';

let LeadStage = mongoose.model('LeadStage');
let Settings = mongoose.model('Settings');

export default {
  load(req, res, next, id) {
    LeadStage.findById(id).exec((err, stage) => {
      if (err) return next(err);
      if(!stage) return next(new Error('not found'));
      req.stage = stage;
      next();
    });
  },

  sort(req, res) {
    let newStageOrder = req.body;
    let update = {
      stages: newStageOrder
    };
    Settings.findOneAndUpdate({}, update, (err, settings) => {
      if (err) {
        console.log(err);
        res.json({error: '500'});
      } else {
        res.json({success: 'Lead Stages updated'});
      }
    });
  },

  index(req, res) {
    Settings.findOne()
      .populate('stages')
      .exec((err, settings) => {
        if(err) {
          console.log(err);
          res.json({error: '500'});
        } else {
          if (settings === null) {
            res.json({stages: []});
          } else {
            res.json({stages: settings.stages});
          }
        }
      });
  },

  create(req, res) {
    let stage = new LeadStage(req.body);
    stage.save((err, leadStage) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        Settings.findOneAndUpdate({},
          { $push: { stages: leadStage } },
          { upsert: true },
          (err, settings) => {
            if (err) {
              console.log(err);
              leadStage.remove();
              res.json({error: '500'});
            } else {
              res.json({stage: leadStage});
            }
          });
      }
    });
  },

  update(req, res) {
    let stage = req.stage;
        newStage = req.body;
    LeadStage.findOneAndUpdate({_id: stage.id}, newStage)
      .exec((err, updatedStage) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({stage: updatedStage});
        }
      });
  },

  destroy(req, res) {
    let stage = req.stage;
    stage.remove((err) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({success: 'Deleted Stage sucessfully'});
      }
    });
  }
};
