import testerData from '../../tester.json';

import * as Const from './Constants/Constants.jsx';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AgreementPage from './AgreementPage.jsx';
import PageControl from './PageControl.jsx';
import CandidatesRatingPage from './CandidatesRatingPage.jsx';
import SummaryPage from './SummaryPage.jsx';
import FinishPage from './FinishPage.jsx';

import DataManager from '../api/DataManager.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      ratings: {},
      testerMturkId: "",
      testerName: "",
      selectedOrder: [],
      showNext: false,
      dataInitialized: false,
      code: 0,
    }

    this.approveNext = this.approveNext.bind(this);
    this.advanceNext = this.advanceNext.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.updateTesterMturkId = this.updateTesterMturkId.bind(this);
    this.updateTesterName = this.updateTesterName.bind(this);
    this.updateCandidatesRating = this.updateCandidatesRating.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
    this.submitRatingData = this.submitRatingData.bind(this);
    this.randomNumGenerator = this.randomNumGenerator.bind(this);
  }

  componentDidMount() {
    this.setState({code: this.randomNumGenerator(8)});
  }

  componentDidUpdate() {
    if(!this.state.dataInitialized) {
      if (this.props.stage1candidates &&
            this.props.stage1candidates.length == Const.CANDIDATES_COUNT) {
        this.prepareData();
      }
    }
  }

  prepareData() {
    tempRatings = {}
    for (var i = this.props.stage1candidates.length - 1; i >= 0; i--) {
      tempRatings[this.props.stage1candidates[i].mturk_id] = 0;
    }

    this.setState({
      candidates : this.props.stage1candidates,
      tester : testerData.tester,
      ratings: tempRatings,
      dataInitialized: true,
    });

    this.processInparams();
  }

  processInparams(){
    query = this.props.location.query;
    this.setState({myanswers: query});
  }

  updateTesterMturkId(mturkId) {
    this.setState({testerMturkId: mturkId});
  }

  updateTesterName(name) {
    this.setState({testerName: name});
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
                  callBack={this.approveNext}
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
      return (<div><b>Loading Data ... </b></div>);
    }
    return (
      <div className="container">
        {this.determinePage()}
        <PageControl
          shouldHide={this.state.currentPage===Const.LAST_PAGE}
          showNext={this.state.showNext}
          callBack={this.advanceNext}
        />
    </div>
    );
  }
}

App.propTypes = {
}

export default createContainer(() => {
  return {
    data: {"intro": {"mturk_id": "", "name": ""}},
    stage1candidates: DataManager.prepareCandidates()
  };
}, App);
