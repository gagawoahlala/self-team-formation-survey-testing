import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Question = new Mongo.Collection('questions');
Question.schema = new SimpleSchema({
  content: {type: String},
  block: {type: String},
  answertype: {type: String}, // "string", "int"
  // display_content: {type: String}
});
