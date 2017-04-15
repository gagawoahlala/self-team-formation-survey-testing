import React, { Component, PropTypes } from 'react';
import * as Const from './Constants/Constants.jsx';

export default class CandidatesViewPerformance extends Component {
  constructor(props){
    super(props);
    this.displayQuestionAndAnswer = this.displayQuestionAndAnswer.bind(this);
  }

  displayQuestionAndAnswer() {
    return (
      Const.PERFORMANCE_QUESTION.map((q) =>
      <div key={q+this.props.performance[q]} className="qa-wrap">
        <p className="question"><strong>{q}</strong></p>
        <p className="answer">{this.props.performance[q]}</p>
      </div>
      )
    );
  }

  render() {
    return (
      <div className="performance">
        <h4><b>Performance:</b></h4>
        <div className="question-container">
          {this.displayQuestionAndAnswer()}
        </div>
      </div>
    );
  }
}

CandidatesViewPerformance.propTypes = {
  performance: React.PropTypes.object.isRequired
}
