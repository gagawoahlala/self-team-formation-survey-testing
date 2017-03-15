import React, { Component, PropTypes } from 'react';

export default class CandidatesViewPersonality extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="personality">
        CandidatesViewPersonality
      </div>
    );
  }
}

CandidatesViewPersonality.propTypes = {
  personality: React.PropTypes.object.isRequired
}
