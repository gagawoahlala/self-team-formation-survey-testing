import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Block = new Mongo.Collection('blocks');
Block.schema = new SimpleSchema({
  group_title: {type: String}
});
