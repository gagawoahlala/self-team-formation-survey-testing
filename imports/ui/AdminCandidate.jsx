import React, { Component, PropTypes } from 'react';
import {Candidate} from '../api/Candidate.js';
import { createContainer } from 'meteor/react-meteor-data';
import ElmtDisplay from './ElmtDisplay.jsx'

import FormGen from './FormGen.jsx';

class AdminCandidate extends Component {
  renderCandidates(){
    return this.props.candidates.map((c) =>
      <ElmtDisplay key={c._id} element={c} deleteCallback={this.deleteCandidate}/>);
  }
  addCandidate(candidate){
    Candidate.insert(candidate);
  }
  deleteCandidate(id){
    Candidate.remove(id);
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-6">
          <FormGen schema={Candidate.schema} addCallback={this.addCandidate}/>
        </div>
        <div className="col-sm-6">
          <ul className="list-group">
            {this.renderCandidates()}
          </ul>
        </div>
      </div>
    )
  }
}

AdminCandidate.propTypes = {
  candidates: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    candidates: Candidate.find({}).fetch(),
  };
}, AdminCandidate);
