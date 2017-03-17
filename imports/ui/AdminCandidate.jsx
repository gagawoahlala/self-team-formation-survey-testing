import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';
import {Question} from '../api/Question.js';
faker = require('faker');

class AdminCandidate extends Component{
  randomGen(){
    let keys = Candidate.schema._schemaKeys.filter((k) => (!k.endsWith(".$")));
    item = {};
    for(var i = 0; i < keys.length; i++){
      let key = keys[i];
      item[key] = Candidate.randGen[key]();
    }
    let questions = Question.find({}).fetch();
    item.answers = questions.map(function(q){
      let obj = {};
      obj[q.qid] = faker.lorem.sentence();
      return obj;
    });
    // questions.map( (q)=> faker.lorem.sentence();
    Candidate.insert(item);
  }
  render(){
    return (
      <div>
        <button onClick={this.randomGen.bind(this)}> random generate candidate </button>
        <MongoConsole model={Candidate} items={this.props.candidates}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    candidates: Candidate.find({}).fetch().reverse(),
  };
}, AdminCandidate);
