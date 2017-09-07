import React, { Component, PropTypes } from 'react';
import * as Const from './Constants/Constants.jsx';

export default class CandidatesViewBasicInfo extends Component {
  constructor(props){
    super(props);
    this.display = this.display.bind(this);
  }

  display() {
    return (
      Object.keys(this.props.basicInfo)
          // .filter((attr) => (attr != Const.BIO))
          .filter((attr) => (Const.DEMO_QUESTION.indexOf(attr) > -1))
          .map((attr) => (
            <div key={attr} className="basic-info-attribute">
              <p><b>{attr} </b></p>  <p>{this.props.basicInfo[attr]}</p>
            </div>
      )));
  }

  render() {
    return (
      <div className="basic-info">
        <h4><b>Basic Information:</b></h4>
        {this.display()}
        <p className="question"><strong>{Const.BIO}</strong></p>
        <p className="answer">{this.props.basicInfo[Const.BIO]}</p>
      </div>
    );
  }
}

CandidatesViewBasicInfo.propTypes = {
  basicInfo: React.PropTypes.object.isRequired
}
