import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Candidate = new Mongo.Collection('candidates');
Candidates.schema = new SimpleSchema({
  mturk_id: {type: String},
  stage: {type: Int},
  session: {type: Int},
  date: {type: Date},
  answers: {type: [Object]},
  selection: {type: [String]},
  rating: {type: [Object]}  // [{userId: rating, block_order: [2,1,3]}]
});
