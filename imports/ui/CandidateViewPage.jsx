import React, { Component, PropTypes } from 'react';

export default class CandidatesViewPage extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   candidates: this.props.candidates,
    // };
    // this.candidatesControl = this.candidatesControl.bind(this);
  }

  render() {
    // console.log(this.props.candidate);
    // console.log(this.props.tester);
    return (
      <div className="">
        CandidatesViewPage - {this.props.candidate.name} - rating: {this.props.rating}
      </div>
    );
  }
}

CandidatesViewPage.propTypes = {
  candidate: React.PropTypes.object.isRequired,
  tester: React.PropTypes.object.isRequired,
  rating: React.PropTypes.number.isRequired
}
