import React, { Component, PropTypes } from 'react';
import { Radio, ButtonGroup} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';
import CandidateSelection from './CandidateSelection.jsx';


class AdminTeamFormation extends Component{

  render(){
    return (
      <div>
          <div>
            <h1>Choose option to form teams</h1>
            <ButtonGroup>
              <Radio name="teamFormationOption">Randomly formed teams</Radio>
              <Radio name="teamFormationOption">Team Formation based on Algorithm</Radio>
            </ButtonGroup>
          </div>
          <div>
            <div className="col-sm-6">
              <CandidateSelection candidates={this.props.stage2candidates}/>
            </div>
            <div className="col-sm-6">
              This is where the result of team formation goes
            </div>

          </div>
        {/* <MongoConsole model={Candidate} items={this.props.candidates}/> */}
      </div>
    );
  }
}


export default createContainer(() => {
  return {
    stage2candidates: Candidate.find({stage: 2}).fetch()
  };
}, AdminTeamFormation);
