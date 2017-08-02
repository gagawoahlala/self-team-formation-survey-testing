import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import DataManager from '../api/DataManager.js';
import TeamTask from './TeamTask.jsx';


export default class FinishPage extends Component {

  // processStates(){
  //
  //   if(this.props.teamforcandidates.length != 0){
  //     browserHistory.push(`/Teamtask/?mturk_id=${this.props.teamforcandidates[0]}`);
  //   } else {
  //     return(
  //       <div>
  //         Team Formation is in the process. Please hold on a couple of seconds and refresh
  //       </div>
  //     );
  //   }
  // }

  render() {
    if(DataManager.getTeamId(this.props.testerId) != null){
    // if(true){
      // browserHistory.push(`/Teamtask/?team_id=${DataManager.getTeamId(this.props.testerId)}`);
      return (<TeamTask teamId={DataManager.getTeamId(this.props.testerId)}/>);
    } else {
      return (<div>Team Formation is in the process. Please hold on a couple of seconds and refresh.</div>);
    }
  }

}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
  testerId: React.PropTypes.string.isRequired,
};
