import React, { Component, PropTypes } from 'react';
import ReactCountdownClock from 'react-countdown-clock-fork';
import {Button, Panel} from 'react-bootstrap';
import TeamTaskView from './TeamTaskView.jsx';
import DataManager from '../api/DataManager.js';


var times = [(new Date).getTime()];


export default class TeamTask extends Component {

    constructor(props) {
      super(props);

      this.state = {
        currentPage: 1,
        teamId: "",
        slogans: [],
        dataInitialized: false,
        dataLoaded: false
      }
      setInterval(this.hack.bind(this), 2000);
      this.getPageCallBack = this.getPageCallBack.bind(this);
      this.determineTime = this.determineTime.bind(this);
      this.processInparams = this.processInparams.bind(this);
    }

    componentWillUpdate() {
      if (this.state.currentPage >= 6) {
        browserHistory.push('/exitsurvey');
      }
    }


    processInparams(){
      query = this.props.location.query;
      let teamId = query["team_id"];
      console.log("the obtained teamId is:");
      console.log(teamId);
      if(teamId != null){
        this.setState({
          teamId: teamId,
          slogans: DataManager.getSloganForTeams(teamId),
          dataLoaded: true
        });
      }

      if(this.state.slogans.length <= 1) {
        browserHistory.push('/teamSelectionFailsurvey');
      }
    }

    hack(){
      if((new Date).getTime() - times[times.length - 1] > 2000 && !this.state.dataInitialized){
        this.setState({dataInitialized: true});
        this.processInparams();
      }
    }

    componentDidUpdate() {
      if(!this.state.dataInitialized) {
        times.push((new Date).getTime());
      }
    }

    updateTime(offsetInSec) {
      let time1 = new Date();
      time1.setSeconds(time1.getSeconds() + offsetInSec);
      return time1;
    }

    determineTime() {
      let length = 10;
      switch (this.state.currentPage) {
        case 1:
          length = 60;
          // length = 5;

          break;
        case 2:
          length = 60;
          // length = 5;

          break;
        case 3:
          length = 120;
          // length = 5;

          break;
        case 4:
          length = 90;
          // length = 5;

          break;
        case 5:
          length = 300;
          // length = 5;

          break;
        case 6:
          length = 90;
          // length = 5;

          break;
      }
      return length;
      // return 10000;
    }

    getPageCallBack(pageNumber) {
      console.log(pageNumber);
      this.setState({currentPage: this.state.currentPage + 1});
    }


  	render(){
      if (!this.state.dataInitialized) {
        return(<div className="announcement"><b>Loading Data ... </b></div>);
      }
      if (!this.state.dataLoaded) {
        return(
          <div className="announcement"><b>It seems that you didn't finish the task on time. Thanks for your participation.</b></div>
        );
      }
      return(
        <div>
          <div className="container">
            <TeamTaskView page={this.state.currentPage} teamId={this.state.teamId}
              timeToCount={this.determineTime()}
              pageCallBack={this.getPageCallBack} slogans={this.state.slogans}/>
          </div>
        </div>
        );

  	}
}
