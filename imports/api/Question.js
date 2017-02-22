import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Question = new Mongo.Collection('questions');
Question.schema = new SimpleSchema({
  content: {type: String},
  block_id: {type: String},
  answer_type: {type: String}, // "string", "int"
  display_content: {type: String},
  show: {type: Boolean}
});
