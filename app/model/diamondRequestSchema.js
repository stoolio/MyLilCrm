import mongoose from 'mongoose';
import {Enum, Range} from '../lib/modelHelpers';

let Schema = mongoose.Schema;

let validColor = 'DEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let validClarity = 'FL IF VVS1 VVS2 VS1 VS2 SI1 SI2 I1 I2 I3'.split(' ')
let validShape = 'Round Princess Emerald Asscher Marquise Radiant Oval Pear Heart Cushion'.split(' ');
let validQuality = 'Excellent|Very Good|Good|Fair|Poor|None'.split('|');

let diamondRequestSchema = new Schema({
  color: Range(validColor),
  clarity: Range(validClarity),
  shape: Enum(validShape),
  size: { type: Number, min: 0, },
  quality: Enum(validQuality)
});
