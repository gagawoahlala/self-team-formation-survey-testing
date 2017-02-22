import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';

class AdminCandidate extends Component{
  render(){
    return (
      <div>
        <MongoConsole model={Candidate} items={this.props.candidates}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    candidates: Candidate.find({}).fetch(),
  };
}, AdminCandidate);
