import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import {faker} from 'meteor/digilord:faker';
faker = require('faker');

export const Candidate = new Mongo.Collection('candidates');
Candidate.schema = new SimpleSchema({
  name: {type: String},
  mturk_id: {type: String},
  stage: {type: Number},
  answers: {type: [Object], blackbox: true},
  selection: {type: [String]},
  rating: {type: [Object], blackbox: true},  // [{userId: rating, block_order: [2,1,3]}]
  blocks: {type: [String]}
});

Candidate.randGen = {
  name: faker.name.findName,
  mturk_id: faker.random.uuid,
  stage: (() => 1),
  session: (() => 1),
  answers: (() => []),
  selection: (() => []),
  rating: (() => []),
  blocks: (() => []),
}
