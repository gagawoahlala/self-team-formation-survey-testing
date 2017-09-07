import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import DataManager from '../api/DataManager.js';
import TeamTask from './TeamTask.jsx';


export default class FinishPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.showTimerCallBack(true);
  }

  componentWillUpdate() {
    if (DataManager.getTeamId(this.props.candidateId) !== null) {
      browserHistory.push(`/team?team_id=${DataManager.getTeamId(this.props.candidateId)}`);
    }
  }

  render() {
    if (this.props.isTimeUp === true) {
      return(<div className="announcement"><b>Loading Data ... </b></div>);
      // let teamId = DataManager.getTeamId(this.props.testerId);
      // if(teamId != null){
      //   return (<TeamTask teamId={teamId} />);
      // } else {
      //   return (<div>It seems that you didn't finish the task on time. Thanks for your participation.</div>);
      // }
    } else {
      return (
        <div className="announcement"><b>Team Formation is in the process. Please hold on a minute. Thank you for your patience.</b></div>

      );
    }

  }

}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
  isTimeUp: React.PropTypes.bool.isRequired,
  showTimerCallBack: React.PropTypes.func.isRequired,
  candidateId: React.PropTypes.string.isRequired
};
