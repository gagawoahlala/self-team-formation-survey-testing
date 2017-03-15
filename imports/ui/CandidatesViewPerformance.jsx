import React, { Component, PropTypes } from 'react';

export default class CandidatesViewPerformance extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="performance">
        <h5><b>Performance:</b></h5>
      </div>
    );
  }
}

CandidatesViewPerformance.propTypes = {
  performance: React.PropTypes.object.isRequired
}
