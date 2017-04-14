import * as Const from './Constants/Constants.jsx';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AgreementPage from './AgreementPage.jsx';
import PageControl from './PageControl.jsx';
import CandidatesRatingPage from './CandidatesRatingPage.jsx';
import SummaryPage from './SummaryPage.jsx';
import FinishPage from './FinishPage.jsx';

import DataManager from '../api/DataManager.js';

var times = [(new Date).getTime()];

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
    }
    setInterval(this.hack.bind(this), 2000);

    this.approveNext = this.approveNext.bind(this);
    this.advanceNext = this.advanceNext.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.updateCandidatesRating = this.updateCandidatesRating.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
    this.submitRatingData = this.submitRatingData.bind(this);
    this.randomNumGenerator = this.randomNumGenerator.bind(this);
    this.checkParam = this.checkParam.bind(this);
  }

  hack(){
    if((new Date).getTime() - times[times.length - 1] > 2000){
      this.setState({dataInitialized: true});
      this.prepareData();
    }
  }

  componentDidMount() {
    this.setState({code: this.randomNumGenerator(8)});
    this.processInparams();
  }

  componentDidUpdate() {
    if(!this.state.dataInitialized) {
      times.push((new Date).getTime());
    }
  }

  prepareData() {
    tempRatings = {}
    for (var i = this.props.stage1candidates.length - 1; i >= 0; i--) {
      tempRatings[this.props.stage1candidates[i].mturk_id] = 0;
    }

    this.setState({
      candidates : this.props.stage1candidates,
      ratings: tempRatings,
      dataInitialized: true,
    });
  }

  processInparams(){
    query = this.props.location.query;
    if (this.checkParam(query)) {
      tester = {}
      Const.OCEAN_QUESTION_ID.map(val => tester[val] = query[val]);
      tester["ocean"] = DataManager.calculateBigFivePoints(tester);
      this.setState({tester : tester});
    }
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
      curPage = (<CandidatesRatingPage
                  candidates={this.state.candidates}
                  tester={this.state.tester}
                  ratings={this.state.ratings}
                  callBack={this.advanceNext}
                  updateCandidatesRating={this.updateCandidatesRating}
                />);
    }else if(this.state.currentPage === Const.SUMMARY_PAGE){
      curPage = (<SummaryPage
                  candidates={this.state.candidates}
                  ratings={this.state.ratings}
                  tester={this.state.tester}
                  selection={this.state.selection}
                  callBack={this.approveNext}
                  updateCandidatesRating={this.updateCandidatesRating}
                  updateCandidatesOrding={this.updateCandidatesOrding}
                />);
    }else if(this.state.currentPage === Const.FINISH_PAGE){
      curPage = (<FinishPage code={this.state.code}/>);
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
    console.log(this.state.testerMturkId);
    console.log(this.state.testerName);
    console.log(this.state.selectedOrder);
    console.log(this.state.ratings);
  }

  randomNumGenerator(n) {
    num = Math.random();
    for (var k = 0; k < n; k++) {
      num *= 10;
    }
    return Math.floor(num);
  }

  render() {
    if(!this.state.dataInitialized) {
      return (<div className="announcement"><b>Loading Data ... </b></div>);
    }
    if(!this.state.isParamValid) {
      return (<div className="announcement"><b>Link Error! Please use the complete link.</b></div>);
    }
    return (
      <div className="container">
        {this.determinePage()}
        <PageControl
          shouldHide={this.state.currentPage===Const.LAST_PAGE || this.state.currentPage===Const.CANDIDATES_RATING_PAGE}
          showNext={this.state.showNext}
          callBack={this.advanceNext}
          currentPage={this.state.currentPage}
        />
    </div>
    );
  }
}

App.propTypes = {
}

export default createContainer(() => {
  return {
    stage1candidates: DataManager.prepareCandidates()
  };
}, App);
