import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Candidate = new Mongo.Collection('candidates');
Candidate.schema = new SimpleSchema({
  name: {type: String},
  mturk_id: {type: String},
  stage: {type: Number},
  session: {type: Number},
  answers: {type: [Object]},
  selection: {type: [String]},
  rating: {type: [Object]}  // [{userId: rating, block_order: [2,1,3]}]
});
