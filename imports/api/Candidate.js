import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import {faker} from 'meteor/digilord:faker';
faker = require('faker');

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

Candidate.randGen = {
  name: faker.name.findName,
  mturk_id: faker.random.uuid,
  stage: (() => 1),
  session: (() => 1),
  answers: (() => []),
  selection: (() => []),
  rating: (() => [])
}
