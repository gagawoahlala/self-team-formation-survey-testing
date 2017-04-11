import React, { Component, PropTypes } from 'react';

import * as Const from './Constants/Constants.jsx';
import CandidateCard from './CandidateCard.jsx';
import CandidateDNDTag from './CandidateDNDTag.jsx';
import CandidateViewModal from './CandidateViewModal.jsx';

export default class SummaryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selection: [],
      currSelection: 0,
      show: false,
      candidate: null,
    };

    this.showCandidates = this.showCandidates.bind(this);
    this.onSelectCallback = this.onSelectCallback.bind(this);
    this.onUnselectCallback = this.onUnselectCallback.bind(this);
    this.orderSelectedCandidates = this.orderSelectedCandidates.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
    this.onCandidateViewClick = this.onCandidateViewClick.bind(this);
    this.onCandidateModalClose = this.onCandidateModalClose.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.selection == nextState.selection &&
        this.state.currSelection == nextState.currSelection &&
        this.state.show == nextState.show &&
        this.state.candidate == nextState.candidate &&
        this.props.candidates == nextProps.candidates &&
        this.props.ratings == nextProps.ratings &&
        this.props.tester == nextProps.tester) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.selection.length == Const.MAX_CANDIDATES_CHOOSE &&
        !Object.values(this.props.ratings).includes(0)) {
      this.props.callBack(true);
    } else {
      this.props.callBack(false);
    }
  }

  showCandidates() {
    return (this.props.candidates.map((candidate) => 
      <CandidateCard 
        key={candidate.mturk_id}
        candidate={candidate}
        rating={this.props.ratings[candidate.mturk_id]}
        isFull={this.state.currSelection == Const.MAX_CANDIDATES_CHOOSE}
        isSelected={this.state.selection.filter((c) => (c.mturk_id == candidate.mturk_id)).length > 0}
        onSelectCallback={this.onSelectCallback}
        onUnselectCallback={this.onUnselectCallback}
        updateCandidatesRating={this.props.updateCandidatesRating}
        onCandidateViewClick={this.onCandidateViewClick}
      />
    ));
  }

  orderSelectedCandidates() {
    return (
      <CandidateDNDTag
        candidates={this.state.selection}
        updateCandidatesOrding={this.updateCandidatesOrding}
      />);
  }

  onCandidateViewClick(user) {
    this.setState({
      show: true,
      candidate: user,
    });
  }

  onCandidateModalClose() {
    this.setState({show: false});
  }

  updateCandidatesOrding(newList) {
    this.setState({selection : newList});
    this.props.updateCandidatesOrding(newList);
  }

  onSelectCallback(user) {
    var tempSelection = this.state.selection;
    tempSelection.push(user);
    this.setState({selection: tempSelection});
    this.setState({currSelection : this.state.currSelection + 1})
    this.props.updateCandidatesOrding(tempSelection);
  }

  onUnselectCallback(user) {
    var tempSelection = this.state.selection.filter(function(candidate){
      return candidate.mturk_id != user.mturk_id;
    });
    this.setState({selection: tempSelection});
    this.setState({currSelection : this.state.currSelection - 1})
    this.props.updateCandidatesOrding(tempSelection);
  }

  render() {
    return (
      <div className="summary-page">
        <div className="candidate-cards-container">
          <h4>Please Rate All Candidates and Choose 3 Potential Teamates:</h4>
          {this.showCandidates()}
        </div>
        <div className="candidates-order-container">
          <h4>Please Drag and Drop Ranking (Most Favourite On Left):</h4>
          {this.orderSelectedCandidates()}
        </div>
        <CandidateViewModal
          candidate={this.state.candidate}
          show={this.state.show}
          onModalClose={this.onCandidateModalClose}
          rating={this.state.candidate ? this.props.ratings[this.state.candidate.mturk_id] : 0}
          tester={this.props.tester}
          updateCandidatesRating={this.props.updateCandidatesRating}
        />
      </div>
    );
  }
}

SummaryPage.propTypes = {
  candidates: React.PropTypes.array.isRequired,
  ratings: React.PropTypes.object.isRequired,
  tester: React.PropTypes.object.isRequired,
  callBack: React.PropTypes.func.isRequired,
  updateCandidatesRating: React.PropTypes.func.isRequired,
  updateCandidatesOrding: React.PropTypes.func.isRequired,
}
