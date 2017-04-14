import React, { Component, PropTypes } from 'react';
import CandidatesViewBasicInfo from './CandidatesViewBasicInfo.jsx';
import CandidatesViewPersonality from './CandidatesViewPersonality.jsx';
import CandidatesViewPerformance from './CandidatesViewPerformance.jsx';

export default class CandidateViewPage extends Component {
  constructor(props){
    super(props);

    this.display = this.display.bind(this);
    this.displayBasicInfo = this.displayBasicInfo.bind(this);
    this.displayPersonality = this.displayPersonality.bind(this);
    this.displayPerformance = this.displayPerformance.bind(this);
  }

  display() {
    return (
      this.props.blocks.map((attr) =>
        <div key={this.props.candidate.name+attr}>
          {(attr === "basic_info") && this.displayBasicInfo()}
          {(attr === "personality") && this.displayPersonality()}
          {(attr === "performance") && this.displayPerformance()}
        </div> 
      )
    );
  }

  displayBasicInfo() {
    return (
      <CandidatesViewBasicInfo
        basicInfo={this.props.candidate.basic_info}
      />
    );
  }

  displayPersonality() {
    return (
      <CandidatesViewPersonality
        name={this.props.candidate.name}
        testerPersonality={this.props.tester}
        candidatePersonality={this.props.candidate.personality}
      />
    );
  }

  displayPerformance() {
    return (
      <CandidatesViewPerformance
        performance={this.props.candidate.performance}
      />
    );
  }

  render() {
    return (
      <div className="candidate-view">
        <h3 className="candidate-name">{this.props.candidate.name}</h3>
        {this.display()}
      </div>
    );
  }
}

CandidateViewPage.propTypes = {
  candidate: React.PropTypes.object,
  tester: React.PropTypes.object.isRequired,
  blocks: React.PropTypes.array.isRequired,
}
