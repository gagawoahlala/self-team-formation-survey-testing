import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Question} from '../api/Question.js';
import MongoConsole from './MongoConsole.jsx';

class AdminQuestion extends Component{
  render(){
    return (
      <div>
        <MongoConsole model={Question} items={this.props.questions}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    questions: Question.find({}).fetch(),
  };
}, AdminQuestion);
