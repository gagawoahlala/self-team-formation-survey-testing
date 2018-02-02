import React from 'react';
import ReactDOM from 'react-dom';
import Survey from 'survey-react';
import {Candidate} from '../api/Candidate.js';
import { browserHistory } from 'react-router';
import * as Const from './Constants/SurveyJson.jsx';
import ReactCountdownClock from 'react-countdown-clock-fork';

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

// window.survey = new Survey.Model(Const.SURVEY_PERSONALITY);



export default class SurveyStage extends React.Component {
  constructor(props){
    super(props);
    this.displayPanelStage3 = this.displayPanelStage3.bind(this);
    this.displayPanelStage2 = this.displayPanelStage2.bind(this);
    this.displayPanelStage1 = this.displayPanelStage1.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
    this.storeDataAtLocal1 = this.storeDataAtLocal1.bind(this);
    this.storeDataAtLocal2 = this.storeDataAtLocal2.bind(this);
    this.goToStage2 = this.goToStage2.bind(this);
    this.goToStage3 = this.goToStage3.bind(this);
    this.goToApp = this.goToApp.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.displayPanel = this.displayPanel.bind(this);
    this.goToWaitingPage = this.goToWaitingPage.bind(this);
    this.state = {
      isStage3Finished: false,
      isStage2Finished: false,
      isStage1Finished: false,
      mturk_id: "",
      survey: new Survey.Model(Const.SURVEY_PERSONALITY),
      stage: 1,
      candidate: {},
      stage1Length: 30,
      stage2Length: 30,
      stage3Length: 30,
      waitingLength: 20,
      timer1Visibility: 1.0,
      timer2Visibility: 0.1,
      timer3Visibility: 0.1,
      timer4Visibility: 0.1
    }

  }



  sendDataToServer() {
    var resultAsJSON = this.state.survey.data;
    var answers = [];

    var ret = Object.keys(resultAsJSON).map(function(key) {
      var ret = {};
      if(typeof resultAsJSON[key] === 'object'){
        ret[key] = Object.values(resultAsJSON[key])[0];
      } else if(typeof resultAsJSON[key] === "number") {
        ret[key] = resultAsJSON[key].toString();
      } else {
        ret[key] = resultAsJSON[key];

      }
      return ret;
    });

    answers = ret;
    candidate = this.state.candidate;
    candidate.answers = candidate.answers.concat(ret);
    this.setState({candidate: candidate});
    console.log(candidate);
    Candidate.insert(candidate);
    this.setState({isStage3Finished: true});
    // browserHistory.push(`/?mturk_id=${candidate.mturk_id}`);
  }

  storeDataAtLocal1() {
    this.setState({isStage1Finished: true});
    var resultAsJSON = this.state.survey.data;
    var answers = [];

    candidate = {
      "mturk_id" : resultAsJSON.mturk_id,
      "stage" : 1,
      "score_base" : {}
    }
    delete resultAsJSON.mturk_id;
    delete resultAsJSON.Example;

    var ret = Object.keys(resultAsJSON).map(function(key) {
      var ret = {};
      if(typeof resultAsJSON[key] === 'object'){
          ret[key] = Object.values(resultAsJSON[key])[0];
      } else if(typeof resultAsJSON[key] === "number") {
        ret[key] = resultAsJSON[key].toString();
      } else {
        ret[key] = resultAsJSON[key];

      }
      return ret;
    });
    answers = ret;
    candidate.answers = answers;
    console.log("Database format of candiate after finish survey");
    console.log(candidate);
    this.setState({candidate: candidate, mturk_id: candidate.mturk_id});

  }

  storeDataAtLocal2() {
    this.setState({isStage2Finished: true});
    var resultAsJSON = this.state.survey.data;
    var answers = [];


    var ret = Object.keys(resultAsJSON).map(function(key) {
      var ret = {};
      if(typeof resultAsJSON[key] === 'object'){
        if (key == 'Q99') {
          ret[key] = Object.values(resultAsJSON[key]);
          // ret[key] = Object.values(resultAsJSON[key])[0];
        } else {
          ret[key] = Object.values(resultAsJSON[key])[0];
        }

      } else if(typeof resultAsJSON[key] === "number") {
        ret[key] = resultAsJSON[key].toString();
      } else {
        ret[key] = resultAsJSON[key];

      }
      return ret;
    });
    candidate = this.state.candidate;
    candidate.answers = candidate.answers.concat(ret);
    this.setState({candidate: candidate});
    console.log(candidate);

  }

  displayPanelStage4() {
    return(
      <div className="announcement"><b>Ready to proceed? In the next section you will rate and select partners. You will also be asked why you chose those partners.</b></div>
    );
  }

  displayPanelStage3() {
    if (this.state.isStage3Finished) {
      return(
        <div className="announcement"><b>Please wait until the timer goes off. You will be automatically redirected shortly.</b></div>
      );
    } else {
      return(<Survey.Survey model={this.state.survey} onComplete={this.sendDataToServer}/>);
    }
  }

  displayPanelStage2() {
    if (this.state.isStage2Finished) {
      return(
        <div className="announcement"><b>Please wait until the timer goes off. You will be automatically redirected shortly.</b></div>
      );
    } else {
      return(<Survey.Survey model={this.state.survey} onComplete={this.storeDataAtLocal2}/>);
    }
  }


  displayPanelStage1() {
    if (this.state.isStage1Finished) {
      return(
        <div className="announcement"><b>Please wait until the timer goes off. You will be automatically redirected to the next page.</b></div>
      );
    } else {
      return(<Survey.Survey model={this.state.survey} onComplete={this.storeDataAtLocal1}/>);
    }
  }

  goToApp() {
    browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
  }

  goToWaitingPage() {
    if (this.state.isStage3Finished) {
      console.log("about to enter stage 4");
      this.setState({stage: 4, timer3Visibility: 0.1, timer4Visibility: 1.0});
    } else {
      browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
    }
  }

  goToStage2() {
    if (this.state.isStage1Finished) {
      this.setState({stage: 2, survey: new Survey.Model(Const.SURVEY_TASK), timer1Visibility: 0.1, timer2Visibility: 1.0});
    } else {
      browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
    }
  }

  goToStage3() {
    if (this.state.isStage2Finished) {
      this.setState({stage: 3, survey: new Survey.Model(Const.PERSONALITY_TASK), timer2Visibility: 0.1, timer3Visibility: 1.0});
    } else {
      browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
    }
  }

  updateTime(offsetInSec) {
    let time1 = new Date();
    time1.setSeconds(time1.getSeconds() + offsetInSec);
    return time1;
  }


  displayPanel() {
    if (this.state.stage === 1) {
      return(this.displayPanelStage1());
    } else if (this.state.stage === 2){
      return(this.displayPanelStage2());
    } else if (this.state.stage === 3){
      return(this.displayPanelStage3());
    } else {
      return(this.displayPanelStage4());
    }
  }

  hideOrShowTimer() {
    var hide = {
      display: none
    }

    return hide;
  }

  render() {


    return (
      <div>
        <div className="container survey-header">
          <h2 className="survey-site-logo col-sm-3">Background Survey</h2>
          <div className={this.state.isStage1Finished === true && this.state.stage === 1 ? 'counter-center-box' : 'disable-display'} >
            <span className="counter-box-survey-text">
            Time left:
            </span>
            <ReactCountdownClock  seconds={this.state.stage1Length} color="#000" alpha={this.state.timer1Visibility} size={100} onComplete={this.goToStage2} restartOnNewProps={false}/>
          </div>
          <div className={this.state.stage === 2 ? '' : 'disable-display'}>
            <div className={this.state.isStage2Finished === true && this.state.stage === 2 ? 'counter-center-box' : 'counter-box-survey'}>
              <span className="counter-box-survey-text">
              Time left:
              </span>
              <ReactCountdownClock  seconds={this.state.stage1Length + this.state.stage2Length} color="#000" alpha={this.state.timer2Visibility} size={100} onComplete={this.goToStage3} restartOnNewProps={false}/>
            </div>
          </div>
          <div className={this.state.stage === 3 ? '' : 'disable-display'}>
            <div className={this.state.isStage3Finished === true && this.state.stage === 3 ? 'counter-center-box' : 'counter-box-survey'}>
              <span className="counter-box-survey-text">
              Time left:
              </span>
              <ReactCountdownClock  seconds={this.state.stage1Length + this.state.stage2Length + this.state.stage3Length} color="#000" alpha={this.state.timer3Visibility} size={100} onComplete={this.goToWaitingPage} restartOnNewProps={false}/>
            </div>
          </div>
          <div className={this.state.isStage3Finished === true && this.state.stage === 4 ? 'counter-center-box' : 'disable-display'}>
            <span className="counter-box-survey-text">
            Time of Waiting:
            </span>
            <ReactCountdownClock  seconds={this.state.stage1Length + this.state.stage2Length + this.state.stage3Length + this.state.waitingLength} color="#000" alpha={this.state.timer4Visibility} size={100} onComplete={this.goToApp} restartOnNewProps={false}/>
          </div>
        </div>
        {this.displayPanel()}
        {/* <Survey.Survey model={survey} onComplete={this.sendDataToServer}/> */}
      </div>
    );

  }

}
