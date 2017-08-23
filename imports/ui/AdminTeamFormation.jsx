import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';
import CandidateSelection from './CandidateSelection.jsx';
import TeamFormationResult from './TeamFormationResult.jsx';
import {Team} from '../api/Team.js';
import ReactCountdownClock from 'react-countdown-clock-fork';



class AdminTeamFormation extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedOption: 'Random',
      disableFormation: true


    }
    this.handleOptionChange = this.handleOptionChange.bind(this);

  }


  handleOptionChange (e) {
    this.setState({
      selectedOption: e.target.value,
      disableFormation: false
    });
  }



  render(){
    return (
      <div>

          <div>
            <div className="col-sm-6">
              <CandidateSelection candidates={this.props.stage2candidates}/>
            </div>
            <div className="col-sm-6">
              <TeamFormationResult teams={this.props.teams}/>
            </div>

          </div>
      </div>
    );
  }
}


export default createContainer(() => {
  return {
    stage2candidates: Candidate.find({stage: 2}).fetch(),
    teams: Team.find({}).fetch(),
    teamModal: Team
  };
}, AdminTeamFormation);
