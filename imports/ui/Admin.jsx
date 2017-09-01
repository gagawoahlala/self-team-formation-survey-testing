import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import AdminCandidate from './AdminCandidate.jsx';
import AdminQuestion from './AdminQuestion.jsx';
import AdminTeamFormation from './AdminTeamFormation.jsx';
import ReactCountdownClock from 'react-countdown-clock-fork';
import {Candidate} from '../api/Candidate.js';
import DataManager from '../api/DataManager.js';
import {Button} from 'react-bootstrap';
import {Team} from '../api/Team.js';



const mapping = {"Candidates": <AdminCandidate />,
                "Questions": <AdminQuestion />,
                "TeamFormation": <AdminTeamFormation/>
              };
// const mapping = {"Candidates": <MongoConsole model={Candidate}/>, "Questions": <MongoConsole />};

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {active: "Candidates", selectedOption: 'Random'};
    this.changeActive = this.changeActive.bind(this);
    this.determineStartTimer = this.determineStartTimer.bind(this);
    this.runTeamFormation = this.runTeamFormation.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  // getInitialState: function () {
  //   return {
  //     selectedOption: 'Random'
  //   }
  // }

  handleOptionChange(e) {
    this.setState({selectedOption: e.target.value});
  }

  changeActive(k){
    this.setState({active: k});
  }
  getNav() {
    let lis = Object.keys(mapping).map((k) =>
      <li key={k} role="presentation" className={k===this.state.active?"active":""}
        onClick={() => this.changeActive(k)}>
        <a href='#'> {k} </a>
      </li>
    )
    return (
      <ul className="nav nav-tabs">
        {lis}
      </ul>
    );
  }

  deleteTeam(id) {
    this.props.teamModal.remove(id);
  }

  clearTeam() {
    for(let i = 0; i < this.props.teams.length; i ++){
      this.deleteTeam(this.props.teams[i]._id);
    }
  }

  runTeamFormation () {

    if(this.state.selectedOption === 'Random') {
      //Need to change here later
      console.log("Entered random formation");
      DataManager.randomlyAssign(2);
    } else if (this.state.selectedOption === 'Algorithmic_pair'){
      console.log("Enter pairing formation");
      DataManager.algorithmAssignByPair(2);
      //Do Nothing here,need to modifiy
    } else {
      console.log("Entering scoring formation");
      DataManager.algorithmAssignByScore(2);
    }
  }

  determineStartTimer() {
    if (this.props.stage1candidates.length > 3) {
      return(
        <div>
          <ReactCountdownClock  seconds={60} onComplete={this.runTeamformation} color="#000"
            timeFormat="hms" alpha={1.0} size={70} restartOnNewProps={false}/>
        </div>
      );
    }
  }

  // componentWillUpdate() {
  //   if (this.props.stage1candidates.length > 3) {
  //     return(
  //       <div>
  //         <ReactCountdownClock  seconds={60} onComplete={this.runTeamformation} color="#000"
  //           timeFormat="hms" alpha={1.0} size={70} restartOnNewProps={false}/>
  //       </div>
  //     );
  //   }
  // }


  render() {
    return (
      <div>
        {/* {this.determineStartTimer()} */}
        <div>
          <ReactCountdownClock  seconds={20} onComplete={this.runTeamformation} color="#000"
            timeFormat="hms" alpha={1.0} size={70} restartOnNewProps={false}/>
        </div>
        <div>
          <label>
            <input type="radio" value="Random" name="Options" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'Random'}/>
              Randomly formed teams
          </label>
          <label>
            <input type="radio" value="Algorithmic_pair" name="Options" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'Algorithmic_pair'}/>
              Team Formation based on Pairing Algorithm
          </label>
          <label>
            <input type="radio" value="Algorithmic_score" name="Options" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'Algorithmic_score'}/>
              Team Formation based on Score Calculating Algorithm
          </label>
          <Button name="startToFormTeams" onClick={this.runTeamFormation} bsStyle="danger"
            >Start to create teams</Button>
          <Button name="clearTeams" onClick={this.clearTeam} bsStyle="danger"
            >clear teams</Button>

        </div>
        {this.getNav()}
        {mapping[this.state.active]}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    stage1candidates: Candidate.find({stage: 1}).fetch(),
    teams: Team.find({}).fetch(),
    teamModal: Team
  };
}, Admin);
