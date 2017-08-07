import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';
import CandidateSelection from './CandidateSelection.jsx';
import TeamFormationResult from './TeamFormationResult.jsx';
import DataManager from '../api/DataManager.js';
import {Team} from '../api/Team.js';


class AdminTeamFormation extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedOption: 'Random',
      disableFormation: true


    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.runTeamFormation = this.runTeamFormation.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  deleteTeam(id) {
    this.props.teamModal.remove(id);
  }

  clearTeam() {
    for(let i = 0; i < this.props.teams.length; i ++){
      this.deleteTeam(this.props.teams[i]._id);
    }
  }

  handleOptionChange (e) {
    this.setState({
      selectedOption: e.target.value,
      disableFormation: false
    });
  }

  runTeamFormation () {
    if(this.state.selectedOption === 'Random') {
      //Need to change here later
      DataManager.randomlyAssign(2);
      this.setState({
        disableFormation: true
      });
    } else {
      //Do Nothing here,need to modifiy
    }
  }



  render(){
    return (
      <div>
          <div>
            <label>
              <input type="radio" value="Random" name="Options" onChange={this.handleOptionChange}/>
                Randomly formed teams
            </label>
            <label>
              <input type="radio" value="Algorithmic" name="Options" onChange={this.handleOptionChange}/>
                Team Formation based on Algorithm
            </label>
            <Button name="startToFormTeams" onClick={this.runTeamFormation} bsStyle="danger"
              disabled={this.state.disableFormation}>Start to create teams</Button>
            <Button name="clearTeams" onClick={this.clearTeam} bsStyle="danger"
              >clear teams</Button>

          </div>
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
