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
    this.displayPanelStage2 = this.displayPanelStage2.bind(this);
    this.displayPanelStage1 = this.displayPanelStage1.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
    this.storeDataAtLocal = this.storeDataAtLocal.bind(this);
    this.goToStage2 = this.goToStage2.bind(this);
    this.goToApp = this.goToApp.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.state = {
      isStage2Finished: false,
      isStage1Finished: false,
      mturk_id: "",
      survey: new Survey.Model(Const.SURVEY_TASK_TEST),
      stage: 1,
      candidate: {},
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
    this.setState({isStage2Finished: true});
    // browserHistory.push(`/?mturk_id=${candidate.mturk_id}`);
  }

  storeDataAtLocal() {
    this.setState({isStage1Finished: true});
    var resultAsJSON = this.state.survey.data;
    var answers = [];
    candidate = {
      "mturk_id" : resultAsJSON.mturk_id,
      "stage" : 1
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
    console.log(candidate);
    this.setState({candidate: candidate, mturk_id: candidate.mturk_id});

  }

  displayPanelStage2() {
    if (this.state.isStage2Finished) {
      return(<div>Please wait until the timer goes off. You will be automatically redirected shortly</div>);
    } else {
      return(<Survey.Survey model={this.state.survey} onComplete={this.sendDataToServer}/>);
    }
  }


  displayPanelStage1() {
    if (this.state.isStage1Finished) {
      return(<div>Please wait until the timer goes off. You will be automatically redirected to the next page.</div>);
    } else {
      return(<Survey.Survey model={this.state.survey} onComplete={this.storeDataAtLocal}/>);
    }
  }

  goToApp() {
    browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
  }

  goToStage2() {
    if (this.state.isStage1Finished) {
      console.log("about to enter stage 2");
      this.setState({stage: 2, survey: new Survey.Model(Const.SURVEY_TASK)});
    } else {
      browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
    }
  }

  updateTime(offsetInSec) {
    let time1 = new Date();
    time1.setSeconds(time1.getSeconds() + offsetInSec);
    return time1;
  }

  render() {
    if (this.state.stage === 2) {
      return (
        <div>
          <div className="container survey-header">
            <h2 className="survey-site-logo col-sm-6">Background Survey</h2>
            <div id="survey-counter-s2" className="col-sm-6">
              Time left:
              <ReactCountdownClock  seconds={20} color="#000" alpha={1.0} size={70} onComplete={this.goToApp}/>
              {/* <Countdown targetDate={this.updateTime(20)} onFinished={this.goToApp} timeSeparator={':'}/> */}

            </div>
          </div>
          {this.displayPanelStage2()}
          {/* <Survey.Survey model={survey} onComplete={this.sendDataToServer}/> */}
        </div>
      );
    } else {
      return(
        <div>
          <div className="container survey-header">
            <h2 className="survey-site-logo col-sm-6">Background Survey</h2>
            <div id="survey-counter-s1" className="col-sm-6">
              Time left:
              <ReactCountdownClock  seconds={30} color="#000" alpha={1.0} size={70} onComplete={this.goToStage2}/>
              {/* <Countdown targetDate={this.updateTime(30)} onFinished={this.goToStage2} timeSeparator={':'}/> */}
            </div>
          </div>
          {this.displayPanelStage1()}
          {/* <Survey.Survey model={survey} onComplete={this.sendDataToServer}/> */}
        </div>
      );
    }

  }

}
