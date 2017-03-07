import React, { Component, PropTypes } from 'react';

export default class CandidatesViewPerformance extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="performance">
        CandidatesViewPerformance
      </div>
    );
  }
}

CandidatesViewPerformance.propTypes = {
  performance: React.PropTypes.object.isRequired
}
