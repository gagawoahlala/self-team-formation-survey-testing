import React, { Component, PropTypes } from 'react';

export default class CandidatesViewPerformance extends Component {
  constructor(props){
    super(props);
    this.displayQuestionAndAnswer = this.displayQuestionAndAnswer.bind(this);
  }

  displayQuestionAndAnswer(question, answer) {
    return (
      <div>
        <p className="question"><strong>{question}</strong></p>
        <p className="answer">{answer}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="performance">
        <h5><b>Performance:</b></h5>
        <div className="question-container">
          {this.displayQuestionAndAnswer(this.props.performance.future.question_diplay,
                                          this.props.performance.future.answer)}
          {this.displayQuestionAndAnswer(this.props.performance.words.question_diplay,
                                          this.props.performance.words.words_found.toString())}
          {this.displayQuestionAndAnswer(this.props.performance.advertisement.question_diplay,
                                          this.props.performance.advertisement.answer)}
        </div>
      </div>
    );
  }
}

CandidatesViewPerformance.propTypes = {
  performance: React.PropTypes.object.isRequired
}
