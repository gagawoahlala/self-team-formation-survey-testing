import * as Const from './Constants/Constants.jsx';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCountdownClock from 'react-countdown-clock-fork';
import ToggleDisplay from 'react-toggle-display';


import AgreementPage from './AgreementPage.jsx';
import PageControl from './PageControl.jsx';
import CandidatesRatingPage from './CandidatesRatingPage.jsx';
import SummaryPage from './SummaryPage.jsx';
import FinishPage from './FinishPage.jsx';

import DataManager from '../api/DataManager.js';
import {Candidate} from '../api/Candidate.js'

var times = [(new Date).getTime()];

// block type: binary for [basic_info, personality, performance]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      ratings: {},
      testerMturkId: "",
      tester: {},
      selectedOrder: [],
      showNext: false,
      dataInitialized: false,
      code: 0,
      isParamValid: false,
      blocks: [],
      metaRating: {},
      isOverMinNumber: false,
      isTimeUp: false,
      showTimer: false,
    }
    setInterval(this.hack.bind(this), 2000);

    this.approveNext = this.approveNext.bind(this);
    this.advanceNext = this.advanceNext.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.updateOtherQuestionRating = this.updateOtherQuestionRating.bind(this);
    this.updateCandidatesRating = this.updateCandidatesRating.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
    this.submitRatingData = this.submitRatingData.bind(this);
    this.randomNumGenerator = this.randomNumGenerator.bind(this);
    this.checkParam = this.checkParam.bind(this);
    this.goToTeamTask = this.goToTeamTask.bind(this);
    this.determineTimer = this.determineTimer.bind(this);
  }

  hack(){
    if((new Date).getTime() - times[times.length - 1] > 5000 && !this.state.dataInitialized){
      this.setState({dataInitialized: true});
      this.processInparams();
      this.prepareData();
    }
  }

  componentDidMount() {
    this.setState({code: this.randomNumGenerator(8)});
    // this.processInparams();
  }

  componentDidUpdate() {
    if(!this.state.dataInitialized) {
      times.push((new Date).getTime());
    }
  }

  sample(candidates, n){
    let set = new Set();
    while(set.size < n && set.size < candidates.length){
      set.add(Math.floor(Math.random()*(candidates.length)));
    }
    return Array.from(set).map((idx) => candidates[idx]);
  }

  prepareData() {
    let tempcandidate = this.state.testerMturkId;
    let candiateToShow = this.props.stage1candidates.filter(function(obj) {
      return obj.mturk_id !== tempcandidate;
    });
    console.log("Candidate before sorting");
    console.log(candiateToShow);
    if(candiateToShow.length >= Const.MAX_CANDIDATES_CHOOSE) {
      this.setState({
        isOverMinNumber : true
      });
    }
    candiateToShow.sort(function(a, b) {
      return parseFloat(b.basic_info["Number of approved HITs:"]) - parseFloat(a.basic_info["Number of approved HITs:"]);
    });
    console.log("After Sorting");
    console.log(candiateToShow);
    let cs = this.sample(candiateToShow, 5);
    console.log(cs);
    cs = DataManager.updateCompatibility(cs, this.state.tester);
    console.log(cs);
    tempRatings = {}
    for (var i = cs.length - 1; i >= 0; i--) {
      tempRatings[cs[i].mturk_id] = 0;
    }

    tempMetaRating = {};
    Const.EXTRA_QUESTIONS.map((q) => {
      tempMetaRating[q] = 0;
    });

    this.setState({
      candidates : cs,
      ratings: tempRatings,
      dataInitialized: true,
      blocks: this.decideBlock(),
      metaRating: tempMetaRating,
      isTimeUp: false
    });
  }

  decideBlock() {
    performance_only = ["performance"];
    exclude_performance = ["basic_info", "personality"];
    all = exclude_performance.concat(performance_only);
    count = [0, 0, 0];
    for(let j = 0; j < this.props.stage2candidates.length; j++){
      blocks = this.props.stage2candidates[j].blocks;
      idx = this.eqArray(blocks, performance_only) ? 0 :
        (this.eqArray(blocks, all) ? 2 : 1);
      count[idx] += 1;
    }
    // console.log(count);
    return [performance_only, exclude_performance, all][count.indexOf(Math.min.apply(Math, count))];
  }


  eqArray(arr1, arr2){
    if(arr1.length != arr2.length){
      return false;
    }
    for(let i = 0; i < arr1.length; i++){
      if(arr1[i] !== arr2[i]){
        return false;
      }
    }
    return true;
  }

  processInparams(){
    query = this.props.location.query;

    let userInDatabase = DataManager.prepareTesters(`${query["mturk_id"]}`);
    // console.log(testertest);

    // console.log(resultAfterProcess);
    if(userInDatabase != null){
      this.setState({
        isParamValid: true,
        testerMturkId: query["mturk_id"],
        tester : userInDatabase
      });
    } else {
      this.setState({isParamValid: false});
    }


    // if (this.checkParam(query)) {
    //   tester = {}
    //   Const.OCEAN_QUESTION_ID.map(val => tester[val] = query[val]);
    //   tester["ocean"] = DataManager.calculateBigFivePoints(tester);
    //   this.setState({tester : tester});
    // }

    // console.log(tester);

  }

  checkParam(param) {
    isValid = Const.OCEAN_QUESTION_ID.reduce(
                (acc=true, val) => acc && param[val] != undefined
              );
    isValid = isValid && (param["mturk_id"] != undefined);
    if (isValid) {
      this.setState({
        isParamValid: true,
        testerMturkId: param["mturk_id"],
      });
      return true;
    } else {
      this.setState({isParamValid: false})
      return false;
    }
  }

  updateOtherQuestionRating(question, rating) {
    tempMetaRating = this.state.metaRating;
    tempMetaRating[question] = rating;
    this.setState({metaRating: tempMetaRating});
  }

  updateCandidatesRating(candidateId, rating) {
    var tempRatings = this.state.ratings;
    tempRatings[candidateId] = rating;
    this.setState({ratings: tempRatings});
  }

  updateCandidatesOrding(newList) {
    this.setState({selectedOrder: newList});
  }

  determinePage() {
    let curPage;
    if(this.state.currentPage === Const.CANDIDATES_RATING_PAGE){
      curPage = (
                  <CandidatesRatingPage
                  candidates={this.state.candidates}
                  tester={this.state.tester}
                  ratings={this.state.ratings}
                  callBack={this.advanceNext}
                  updateCandidatesRating={this.updateCandidatesRating}
                  blocks={this.state.blocks}
                />);
    }else if(this.state.currentPage === Const.SUMMARY_PAGE){
      curPage = (<SummaryPage
                  candidates={this.state.candidates}
                  ratings={this.state.ratings}
                  tester={this.state.tester}
                  selection={this.state.selection}
                  callBack={this.approveNext}
                  updateOtherQuestionRating={this.updateOtherQuestionRating}
                  updateCandidatesRating={this.updateCandidatesRating}
                  updateCandidatesOrding={this.updateCandidatesOrding}
                  metaRating={this.state.metaRating}
                  blocks={this.state.blocks}
                />);
    }else if(this.state.currentPage === Const.FINISH_PAGE){
      curPage = (<FinishPage code={this.state.code}  isTimeUp={this.state.isTimeUp} showTimerCallBack={this.determineTimer}/>);
    }else {
      curPage = (<AgreementPage
                  callBack={this.approveNext} />);
    }
    return curPage;
  }

  approveNext(decision) {
    this.setState({showNext: decision});
  }

  advanceNext() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage + 1,
      showNext: false
    }));

    if (this.state.currentPage === Const.SUMMARY_PAGE) {
      this.submitRatingData();
    }
  }

  submitRatingData() {
    // console.log(this.state.testerMturkId);
    // console.log(this.state.testerName);
    // console.log(this.state.selectedOrder);
    // console.log(this.state.ratings);
    answers = [];
    keys = Object.keys(this.props.location.query);
    for(let i = 0; i < keys.length; i++){
      obj = {};
      obj[keys[i]] = this.props.location.query[keys[i]];
      answers.push(obj);
    }
    candidate = {
      'mturk_id': this.state.testerMturkId,
      'stage': 2,
      'answers': answers,
      'selection': this.state.selectedOrder.map((d) => d.mturk_id),
      'rating': this.state.ratings,
      'code': this.state.code,
      'blocks': this.state.blocks,
      'metaRating': this.state.metaRating
    }
    // console.log(candidate);

    candidate.selection.map(function(selection) {
      let selectionId = Candidate.find({mturk_id: selection, stage: 1},{fields: {'_id': 1}}).fetch()[0]._id;
      Candidate.update({_id: selectionId}, {$inc: {'score_base.popularity_selection': 1}});
      console.log(`updated ${selection}, and its id is ${selectionId}`);

    })
    for (var reviewee in candidate.rating) {
      if (candidate.rating.hasOwnProperty(reviewee)) {
        CandidateId = Candidate.find({mturk_id: reviewee, stage: 1},{fields: {'_id': 1}}).fetch()[0]._id;
        Candidate.update({_id: CandidateId}, {$inc: {'score_base.num_review': 1}});
        console.log(candidate.rating[reviewee]);
        Candidate.update({_id: CandidateId}, {$inc: {'score_base.sum_rating': candidate.rating[reviewee]}});
      }
    }
    Candidate.insert(candidate);
  }

  randomNumGenerator(n) {
    return Math.random().toString(36).substring(5);
  }

  goToTeamTask() {
    this.setState({isTimeUp: true});
    browserHistory.push(`/team?team_id=${DataManager.getTeamId(this.state.testerMturkId)}`);
  }

  determinFooter() {
    if (this.state.currentPage != Const.FINISH_PAGE) {
      return(
        <div>
          <footer className="footer"></footer>
        </div>
      );
    } else {
      return(
        <div>
          <footer className="disable-display"></footer>
        </div>
      );
    }
  }

  determineTimer(showTimer) {
    this.setState({showTimer: showTimer});
  }
  render() {
    if(!this.state.dataInitialized) {
      return (
        <div className="announcement"><b>Loading Data ... </b></div>
      );
    }
    if(!this.state.isParamValid) {
      return (
        // <div className="announcement"><b>Link Error! Please use the complete link.</b></div>
        <div className="announcement"><b>It seems that you didn't complete the survey on time. Thanks for your participation.</b></div>
      );
    }
    if(!this.state.isOverMinNumber) {
      return (
        <div className="announcement"><b>Please wait enough number of participants to fill in the survey. Try to refresh later.</b></div>
      );
    }
    return (
      <div>
        <div className={this.state.showTimer ? 'counter-center-box' : 'center-timer-teamselection'}>
          {/* <span className="counter-box-app-text">
          Time to wait:
          </span> */}
          <ReactCountdownClock  seconds={120} color="#000" alpha={1.0} size={100} onComplete={this.goToTeamTask} restartOnNewProps={false}/>
        </div>


        <div className="container">
          {this.determinePage()}
          <PageControl
            shouldHide={this.state.currentPage===Const.LAST_PAGE || this.state.currentPage===Const.CANDIDATES_RATING_PAGE}
            showNext={this.state.showNext}
            callBack={this.advanceNext}
            currentPage={this.state.currentPage}
          />
        </div>
        {this.determinFooter()}

      </div>
    );
  }
}



export default createContainer(() => {
  return {
    stage1candidates: DataManager.prepareCandidates(),
    stage2candidates: Candidate.find({stage: 2}).fetch()
  };
}, App);
