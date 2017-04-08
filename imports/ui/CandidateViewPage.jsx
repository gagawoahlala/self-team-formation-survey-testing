import React, { Component, PropTypes } from 'react';
import CandidatesViewBasicInfo from './CandidatesViewBasicInfo.jsx';
import CandidatesViewPersonality from './CandidatesViewPersonality.jsx';
import CandidatesViewPerformance from './CandidatesViewPerformance.jsx';

export default class CandidateViewPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="candidate-view">
        <h3 className="candidate-name">{this.props.candidate.name}</h3>
        <CandidatesViewBasicInfo
          basicInfo={this.props.candidate.basic_information}
        />
        <CandidatesViewPersonality
          name={this.props.candidate.name}
          testerPersonality={this.props.tester.personality}
          candidatePersonality={this.props.candidate.personality}
        />
        <CandidatesViewPerformance
          performance={this.props.candidate.performance}
        />
      </div>
    );
  }
}

CandidateViewPage.propTypes = {
  candidate: React.PropTypes.object,
  tester: React.PropTypes.object.isRequired,
}
