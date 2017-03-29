import React, { Component, PropTypes } from 'react';
import ReactStars from 'react-stars';
import { ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';

import * as Const from './Constants/Constants.jsx';

export default class CandidatesViewPersonality extends Component {
  constructor(props){
    super(props);
    this.displaySpeciallyDesignedQuestions =
      this.displaySpeciallyDesignedQuestions.bind(this);
    this.displayOCEAN = this.displayOCEAN.bind(this);
    this.displayOtherQuestions = this.displayOtherQuestions.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.displayBar = this.displayBar.bind(this);
    this.displayLikertScale = this.displayLikertScale.bind(this);
  }

  displayLikertScale(value) {
    var likertScaleContainerName = "likert-scale-container likert-scale-container-"
                                  + value;
    return (
      <div className={likertScaleContainerName}>
        {Const.LIKERT_SCALE[parseInt(value)]}
      </div>
    );
  }

  displayBar(value) {
    return(
      <div className="progress-bar-div">
        <ProgressBar
          now={value}
          label={`${value} / 5`}
          max={5}
        />
      </div>
    );
  }

  getAnswer(value, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].question_content == value) {
          return arr[i].answer;
        }
    }
    return null;
  }

  displayOCEAN() {
    return (
      Const.OCEAN.map((attr) =>       
        <tr key={attr}>
          <td>{attr} Score:</td>
          <td>
            {this.displayBar(this.props.candidatePersonality.ocean[attr])}
          </td>
          <td>
            {this.displayBar(this.props.testerPersonality.ocean[attr])}
          </td>
        </tr>
      )
    )
  }

  displaySpeciallyDesignedQuestions() {
    return (
      this.props.candidatePersonality
          .specially_designed_questions.map((q, index) =>
        <tr key={"specially_designed_questions"+index}>
          <td>{q.question_diplay}</td>
          <td>
            {this.displayLikertScale(q.answer)}
          </td>
          <td>
            {this.displayLikertScale(
              this.getAnswer(q.question_content,
                this.props
                    .testerPersonality
                    .specially_designed_questions))
            }
          </td>
        </tr>  
      )
    );
  }

  displayOtherQuestions() {
    return (
      this.props.candidatePersonality
          .other_questions.map((q, index) =>
        <tr key={"other_questions"+index}>
          <td>{q.question_diplay}</td>
          <td>{q.answer}</td>
          <td>{this.getAnswer(q.question_content,
                this.props.testerPersonality.other_questions)}</td>
        </tr>  
      )
    );
  }

  render() {
    return (
      <div className="personality">
        <h5><b>Personality:</b></h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>{this.props.name+"'"}s Answer</th>
              <th>My Answer</th>
            </tr>
          </thead>
          <tbody>
            {this.displayOCEAN()}
            {this.displaySpeciallyDesignedQuestions()}
            {this.displayOtherQuestions()}
          </tbody>
        </table>
      </div>
    );
  }
}

CandidatesViewPersonality.propTypes = {
  name: React.PropTypes.string.isRequired,
  testerPersonality: React.PropTypes.object.isRequired,
  candidatePersonality: React.PropTypes.object.isRequired
}
