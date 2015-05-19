import express from 'express';
import mongoose from 'mongoose';

let User = mongoose.model('User');

export default {
  load: (req, res, next, id) => {
    User.findById(id).populate('contact').exec((err, user) => {
      if(err) return next(err);
      if(!user) return next(new Error('not found'));
      req.user = user;
      next();
    });
  },

  index: (req, res) => {
    User.find()
      .select('_id username')
      .exec((err, users) => {
        if(err) {
          console.log(err);
          res.json({error: '500'});
        } else {
          res.json({users: users});
        }
      });
  },

  // new: (req, res) => {},

  create: (req, res) => {
    let user = new User(req.body);
    user.save((err, newUser) => {
      if(err) {
        res.json({error: err});
      } else {
        res.json({user: newUser});
      }
    });
  },

  login: (req, res) => {
    let {username, password} = req.body;
    if (username.length === 0 || password.length === 0) {
      res.json({error: 'Bad username or password'});
    } else {
      User.findOne({username: username}, (err, user) => {
        if (err) {
          console.log(err);
          res.json({error: err.text});
        } else {
          if(user === null) {
            res.json({login: false, user: null});
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              console.log(err);
              res.json({error: err.text});
            } else {
              if (isMatch) {
                res.json({login: true, user: {
                  _id: user._id,
                  username: user.username,
                  createdAt: user.createdAt
                }});
              } else {
                res.json({login: false, user: null});
              }
            }
          })
        }
      });
    }
  },

  show: (req, res) => {
    res.json({user: req.user});
  },

  // edit: (req, res) => {},

  update: (req, res) => {
    let user = req.user;
    let id = user._id;
    delete user._id;
    user.findOneAndUpdate({_id: id}, user)
      .exec((err, updatedUser) => {
        if(err) {
          console.log(err);
          res.json({error: err});
        } else {
          res.json({user: updatedUser});
        }
      });
  },

  destroy: (req, res) => {
    let user = req.user;
    user.remove((err) => {
      if(err) {
        console.log(err);
        res.json({error: err});
      } else {
        res.json({info: 'Deleted sucessfully'});
      }
    });
  }
};
