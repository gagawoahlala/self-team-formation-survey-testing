import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import {faker} from 'meteor/digilord:faker';
faker = require('faker');

export const Team = new Mongo.Collection('teams');
Team.schema = new SimpleSchema({
  // name: {type: String},
  team_id: {type: String},
  members: {type: [String], optional: true},
});
