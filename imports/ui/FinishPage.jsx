import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import DataManager from '../api/DataManager.js';
import TeamTask from './TeamTask.jsx';


export default class FinishPage extends Component {


  render() {
    if (this.props.isTimeUp) {
      if(DataManager.getTeamId(this.props.testerId) != null){
        return (<TeamTask teamId={DataManager.getTeamId(this.props.testerId)}/>);
      } else {
        return (<div>It seems that you didn't finish the task on time. Thanks for your participation.</div>);
        // return (<div>Team Formation is in the process. Please hold on a second</div>);
      }
    } else {
      return (<div>Team Formation is in the process. Please hold on a second</div>);
    }

  }

}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
  testerId: React.PropTypes.string.isRequired,
  // isTimeUp: React.PropTypes.boolean.isRequired
};
