import React, { Component, PropTypes } from 'react';
import ReactCountdownClock from 'react-countdown-clock-fork';
import {Button, Panel} from 'react-bootstrap';
import TeamTaskView from './TeamTaskView.jsx';




export default class TeamTask extends Component {

    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
      }
      this.getPageCallBack = this.getPageCallBack.bind(this);
      this.determineTime = this.determineTime.bind(this);
    }

    goToExitSurvey() {
      browserHistory.push('/exitsurvey');
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
          break;
        case 2:
          length = 60;
          break;
        case 3:
          length = 120;
          break;
        case 4:
          length = 90;
          break;
        case 5:
          length = 300;
          break;
        case 6:
          length = 90;
          break;
      }
      return length;
      // return 10000;
    }

    getPageCallBack(pageNumber) {
      console.log(pageNumber);
      this.setState({currentPage: pageNumber});
    }


  	render(){
  		return(
        <div>
    			<div className="container">

            <TeamTaskView page={this.state.currentPage} teamId={this.props.teamId}
              timeToCount={this.determineTime()}
              pageCallBack={this.getPageCallBack} slogans={this.props.slogans}/>
    			</div>


        </div>

  			);
  	}

}


TeamTask.propTypes = {
  teamId: React.PropTypes.string.isRequired,
  slogans: React.PropTypes.array.isRequired
};
