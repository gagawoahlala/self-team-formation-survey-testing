import React, { Component, PropTypes } from 'react';

export default class CandidatesViewBasicInfo extends Component {
  constructor(props){
    super(props);
    this.display = this.display.bind(this);
  }

  display() {
    return (
      Object.keys(this.props.basicInfo)
          .map((attr) => (
            <span key={attr} className="basic-info-attribute">
              <b>{attr}:</b>  {this.props.basicInfo[attr]}
            </span>
      )));
  }

  render() {
    return (
      <div className="basic-info">
        <h5><b>Basic Information:</b></h5>
        {this.display()}
      </div>
    );
  }
}

CandidatesViewBasicInfo.propTypes = {
  basicInfo: React.PropTypes.object.isRequired
}
