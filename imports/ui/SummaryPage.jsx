import React, { Component, PropTypes } from 'react';

import * as Const from './Constants/Constants.jsx';
import CandidateCard from './CandidateCard.jsx';
import CandidateDNDTag from './CandidateDNDTag.jsx';
import CandidateViewModal from './CandidateViewModal.jsx';
import OtherQuestion from './OtherQuestion';

const OTHER_QUESTION_STAR_AMOUNT = 7;
const STAR_SIZE = 26;
const STAR_COLOR = "#E46D74";

export default class SummaryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selection: [],
      currSelection: 0,
      show: false,
      candidate: null,
      flag: 0,
    };

    this.showCandidates = this.showCandidates.bind(this);
    this.onSelectCallback = this.onSelectCallback.bind(this);
    this.onUnselectCallback = this.onUnselectCallback.bind(this);
    this.orderSelectedCandidates = this.orderSelectedCandidates.bind(this);
    this.updateCandidatesOrding = this.updateCandidatesOrding.bind(this);
    this.onCandidateViewClick = this.onCandidateViewClick.bind(this);
    this.onCandidateModalClose = this.onCandidateModalClose.bind(this);
    this.isTaskFinished = this.isTaskFinished.bind(this);
    this.getTodoClassName = this.getTodoClassName.bind(this);
    this.getTodoSymbol = this.getTodoSymbol.bind(this);
    this.showExtraQuestions = this.showExtraQuestions.bind(this);
    this.HackOtherQuestionCallback = this.HackOtherQuestionCallback.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.selection == nextState.selection &&
        this.state.flag == nextState.flag &&
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
        !Object.values(this.props.ratings).includes(0) &&
        !Object.values(this.props.metaRating).includes(0)) {
      this.props.callBack(true);
    } else {
      this.props.callBack(false);
    }
  }

  HackOtherQuestionCallback(question, newRating) {
    this.setState({flag: this.state.flag+1});
    this.props.updateOtherQuestionRating(question, newRating);
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

  showExtraQuestions() {
    return (Const.EXTRA_QUESTIONS.map((question) =>
      <div key={question} className="extra-question-block">
        <OtherQuestion
          question={question}
          metaRating={this.props.metaRating}
          HackOtherQuestionCallback={this.HackOtherQuestionCallback}
        />
      </div>
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

  isTaskFinished(todo) {
    if (todo === "rate") {
      if (!Object.values(this.props.ratings).includes(0))
        return true;
      else 
        return false;
    } else if (todo === "other") {
      if (!Object.values(this.props.metaRating).includes(0))
        return true;
      else 
        return false;
    } else {
      if (this.state.selection.length == Const.MAX_CANDIDATES_CHOOSE)
        return true;
      else
        return false;
    }
  }

  getTodoClassName(todo) {
    return this.isTaskFinished(todo) ? "todo-finish" : "todo-not-finish";
  }

  getTodoSymbol(todo) {
    return this.isTaskFinished(todo) ? (<span>&nbsp;&#10004;</span>) : (<span>&nbsp;&#10008;</span>);
  }

  render() {
    return (
      <div className="summary-page">
        <div className="todo-list">
          <h4>Please Finish the Following:</h4>
          <ul>
            <li className={this.getTodoClassName("rate")}>
              Rate all candidates (you can click view and rate them). 
              {this.getTodoSymbol("rate")}
            </li>
            <li className={this.getTodoClassName("select")}>
              Choose 3 potential teamates and sort them based on how well do you think you can work together.  
              {this.getTodoSymbol("select")}
            </li>
            <li className={this.getTodoClassName("other")}>
              Finish all survey satisfaction questions.  
              {this.getTodoSymbol("other")}
            </li>
          </ul>
        </div>
        <div className="candidate-cards-container">
          {this.showCandidates()}
        </div>
        <div className="candidates-order-container">
          <h5>Please Drag and Drop Ranking (Most Favourite On Left):</h5>
          {this.orderSelectedCandidates()}
        </div>
        <div className="other-question-container">
          <h5>Please Finish the Following Survey Satisfaction Questions:</h5> 
          {this.showExtraQuestions()}     
        </div>
        <CandidateViewModal
          candidate={this.state.candidate}
          show={this.state.show}
          onModalClose={this.onCandidateModalClose}
          rating={this.state.candidate ? this.props.ratings[this.state.candidate.mturk_id] : 0}
          tester={this.props.tester}
          updateCandidatesRating={this.props.updateCandidatesRating}
          blocks={this.props.blocks}
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
  updateOtherQuestionRating: React.PropTypes.func.isRequired,
  updateCandidatesRating: React.PropTypes.func.isRequired,
  updateCandidatesOrding: React.PropTypes.func.isRequired,
  metaRating: React.PropTypes.object.isRequired,
  blocks: React.PropTypes.array.isRequired,
}
