import React, { Component, PropTypes } from 'react';
import CandidatesViewBasicInfo from './CandidatesViewBasicInfo.jsx';
import CandidatesViewPersonality from './CandidatesViewPersonality.jsx';
import CandidatesViewPerformance from './CandidatesViewPerformance.jsx';

export default class CandidateViewPage extends Component {
  constructor(props){
    super(props);

    this.display = this.display.bind(this);
    this.displayPersonInfo = this.displayPersonInfo.bind(this);
    this.displayPerformance = this.displayPerformance.bind(this);
  }

  display() {
    return (
      this.props.blocks.map((attr) =>
        <div key={this.props.candidate.name+attr}>
          {(attr === "personal_info") && this.displayPersonInfo()}
          {(attr === "performance") && this.displayPerformance()}
        </div> 
      )
    );
  }

  displayPersonInfo() {
    return (
      <div>
        <CandidatesViewBasicInfo
          basicInfo={this.props.candidate.basic_info}
        />
        <CandidatesViewPersonality
          name={this.props.candidate.name}
          testerPersonality={this.props.tester}
          candidatePersonality={this.props.candidate.personality}
        />
      </div>
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
