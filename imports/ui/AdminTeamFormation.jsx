import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import {Candidate} from '../api/Candidate.js';
import MongoConsole from './MongoConsole.jsx';
import CandidateSelection from './CandidateSelection.jsx';
import DataManager from '../api/DataManager.js';


class AdminTeamFormation extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedOption: 'Random'
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.runTeamFormation = this.runTeamFormation.bind(this);
  }

  handleOptionChange (e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  runTeamFormation () {
    if(this.state.selectedOption === 'Random') {
      //Need to change here later
      DataManager.randomlyAssign(2);
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
            <Button name="startToFormTeams" onClick={this.runTeamFormation}>Start to create teams</Button>
            {/* <ButtonGroup>
              <Radio value="Random" onChange={this.handleOptionChange}>Randomly formed teams</Radio>
              <Radio value="Algorithmic" onChange={this.handleOptionChange}>Team Formation based on Algorithm</Radio>
              <Button name="startToFormTeams" onClick={this.runTeamFormation}>Start to create teams</Button>
            </ButtonGroup> */}
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
