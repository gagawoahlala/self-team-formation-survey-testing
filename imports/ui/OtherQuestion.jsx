import React, { Component, PropTypes } from 'react';

import * as Const from './Constants/Constants.jsx';
import ReactStars from 'react-stars';

const OTHER_QUESTION_STAR_AMOUNT = 7;
const STAR_SIZE = 26;
const STAR_COLOR = "#E46D74";

export default class OtherQuestion extends Component {
  constructor(props){
    super(props);
    this.otherQuestionRatingChanged = this.otherQuestionRatingChanged.bind(this);
  }

  otherQuestionRatingChanged(newRating) {
    this.props.HackOtherQuestionCallback(this.props.question, newRating)
  }

  render() {
    return (
      <div>
        <p className="extra-question">&nbsp;&nbsp;&nbsp;&nbsp;{this.props.question}</p>
        <div className="extra-question-solution">
          <ReactStars
            value={this.props.metaRating[this.props.question]}
            count={OTHER_QUESTION_STAR_AMOUNT}
            size={STAR_SIZE}
            color2={STAR_COLOR}
            half={false}
            onChange={this.otherQuestionRatingChanged}
          />
          <p>( {Const.EXTRA_QUESTION_TOOL_TIP} )</p>
        </div>
      </div>
    );
  }
}

OtherQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
  metaRating: React.PropTypes.object.isRequired,
  HackOtherQuestionCallback: React.PropTypes.func.isRequired,
}
