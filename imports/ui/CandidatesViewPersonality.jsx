import React, { Component, PropTypes } from 'react';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';
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
    return (
      <Tooltip id="tooltip">
        <strong>{Const.LIKERT_SCALE[parseInt(value)]}</strong>
      </Tooltip>
    );
  }

  displayBar(value) {
    return(
      <div className="likert-scale-div">
        <OverlayTrigger placement="top" overlay={this.displayLikertScale(value)}>
          <ProgressBar className="likert-scale">
            <ProgressBar bsStyle="danger" now={value>=1 ? 20:0} key={1} />
            <ProgressBar bsStyle="warning" now={value>=2 ? 20:0} key={2} />
            <ProgressBar bsStyle="success" now={value>=3 ? 20:0} key={3} />
            <ProgressBar bsStyle="info" now={value>=4 ? 20:0} key={4} />
            <ProgressBar now={value>=5 ? 20:0} key={5} />
          </ProgressBar>
        </OverlayTrigger>
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
      <tr>
        <td>OCEAN Score</td>
        <td>
          {this.displayBar(this.props.candidatePersonality.ocean.score)}
        </td>
        <td>
          {this.displayBar(this.props.testerPersonality.ocean.score)}
        </td>
      </tr>
    )
  }

  displaySpeciallyDesignedQuestions() {
    return (
      this.props.candidatePersonality
          .specially_designed_questions.map((q, index) =>
        <tr key={"specially_designed_questions"+index}>
          <td>{q.question_diplay}</td>
          <td>
            {this.displayBar(q.answer)}
          </td>
          <td>
            {this.displayBar(
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
