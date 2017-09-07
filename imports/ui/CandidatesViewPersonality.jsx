import React, { Component, PropTypes } from 'react';
import { ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

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

  displayBar(value, attr, label) {
    color = "progress-bar-"+label
    return(
      <div className="progress-bar-div">
        <div>
          <span className="progress-label">{label.charAt(0).toUpperCase()+label.slice(1)}</span>
          <ProgressBar
            now={value}
            // label={`${value} / ${Const.OCEAN[attr]}`}
            label={`${value}%`}
            max={Const.OCEAN[attr]}
            bsStyle={label == "you" ? "warning" : "info"}
          />
        </div>
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
    let attr = "compatibility";
    return (
      // Object.keys(Const.OCEAN).map((attr) =>
      //   <tr key={attr}>
      //     <td>
      //       <div className="ocean-description">
      //         <b>{attr.charAt(0).toUpperCase()+attr.slice(1)} Score:</b>
      //         <p className="ocean-tooltip">{Const.TOOLTIPS[attr]}</p>
      //       </div>
      //     </td>
      //     <td>
      //       <b><p className="ocean-score-label">{Const.OCEAN_SCALE_LOW[attr]}</p></b>
      //     </td>
      //     <td>
      //       {this.displayBar(this.props.candidatePersonality.ocean[attr], attr, "candidate")}
      //       {this.displayBar(this.props.testerPersonality.ocean[attr], attr, "you")}
      //     </td>
      //     <td>
      //       <b><p className="ocean-score-label">{Const.OCEAN_SCALE_HIGH[attr]}</p></b>
      //     </td>
      //   </tr>
      // )
      <tr key={attr}>
        <td>
          <div className="ocean-description">
            <b>{attr.charAt(0).toUpperCase()+attr.slice(1)} Score:</b>
            <p className="ocean-tooltip">{Const.TOOLTIPS[attr]}</p>
          </div>
        </td>
        <td>
          <b><p className="ocean-score-label">{Const.OCEAN_SCALE_LOW[attr]}</p></b>
        </td>
        <td>
          {this.displayBar(this.props.candidatePersonality.compatibility, attr, "your compatibility with this candidate")}
        </td>
        <td>
          <b><p className="ocean-score-label">{Const.OCEAN_SCALE_HIGH[attr]}</p></b>
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
        <h4><b>Personality:</b></h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th></th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.displayOCEAN()}
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
