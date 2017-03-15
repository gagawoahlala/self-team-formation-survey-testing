import candidatesData from '../../candidates.json';
import testerData from '../../tester.json';

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import IntroPage from './IntroPage.jsx';
import PageControl from './PageControl.jsx';
import CandidatesRatingPage from './CandidatesRatingPage.jsx';
import SummaryPage from './SummaryPage.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      ratings: {},
      testerMturkId: "",
      testerName: "",
      selectedOrder: [],
      showNext: false
    }

    this.approveNext = this.approveNext.bind(this);
    this.advanceNext = this.advanceNext.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.updateTesterMturkId = this.updateTesterMturkId.bind(this);
    this.updateTesterName = this.updateTesterName.bind(this);
    this.updateCandidatesRating = this.updateCandidatesRating.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
  }

  componentDidMount() {
    this.prepareData();
  }

  prepareData() {
    this.setState({
      candidates : candidatesData.candidates,
      tester : testerData.tester
    });

    tempRatings = {}
    for (var i = candidatesData.candidates.length - 1; i >= 0; i--) {
      tempRatings[candidatesData.candidates[i].id] = 0;
    }
    this.setState({ratings: tempRatings});
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
    if(this.state.currentPage === 2){
      curPage = (<CandidatesRatingPage
                  candidates={this.state.candidates}
                  tester={this.state.tester}
                  ratings={this.state.ratings}
                  callBack={this.approveNext}
                  updateCandidatesRating={this.updateCandidatesRating}
                />);
    }else if(this.state.currentPage === 3 ){
      curPage = (<SummaryPage
                  candidates={this.state.candidates}
                  ratings={this.state.ratings}
                  tester={this.state.tester}
                  selection={this.state.selection}
                  updateCandidatesRating={this.updateCandidatesRating}
                  updateCandidatesOrding={this.updateCandidatesOrding}
                />);
    }else {
      curPage = (<IntroPage
                  mturkId={this.state.testerMturkId}
                  name={this.state.testerName}
                  callBack={this.approveNext}
                  updateTesterMturkId={this.updateTesterMturkId}
                  updateTesterName={this.updateTesterName}
                />);
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
  }

  render() {
    return (
      <div className="container">
        {this.determinePage()}
        <PageControl showNext={this.state.showNext} callBack={this.advanceNext}/>
    </div>
    );
  }
}

App.propTypes = {
}

export default createContainer(() => {
  return {
    data: {"intro": {"mturk_id": "", "name": ""}},
  };
}, App);
