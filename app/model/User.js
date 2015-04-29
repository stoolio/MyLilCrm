import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;

// http://blog.matoski.com/articles/jwt-express-node-mongoose/#how-we-used-auth

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    require: true
  }
});

userSchema.pre('save', function(next) {
  let user = this;
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if(err) {
            return next(err);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    }); else {
      return next();
    }
  }
});

userSchema.methods.comparePassword = function(pass, cb) {
  bcrypt.compare(pass, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    } else {
      cb(null, isMatch);
    }
  });
}

let User = mongoose.model('User', userSchema);

export default User;
