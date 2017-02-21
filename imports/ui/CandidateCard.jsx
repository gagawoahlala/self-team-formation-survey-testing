import React, { Component, PropTypes } from 'react';
import CandidatesRatingStars from './CandidatesRatingStars.jsx';

export default class CandidateCard extends Component {
  constructor(props){
    super(props);

    this.candidateSelection = this.candidateSelection.bind(this);
  }

  candidateSelection() {
    let button = null;
    if (this.props.isSelected) {
      button = (<button 
                  disabled={this.props.isFull && !this.props.isSelected}
                  className="btn btn-default btn-danger"
                  onClick={this.props.onUnselectCallback.bind(null, this.props.candidate)}
                >
                  Unselect
                </button>);
    } else {
      button = (<button 
                  disabled={this.props.isFull && !this.props.isSelected}
                  className="btn btn-default btn-primary"
                  onClick={this.props.onSelectCallback.bind(null, this.props.candidate)}>
                  Select
                </button>);
    }
    return button;
  }

  render() {
    return (
      <div className="">
        CandidateCard - {this.props.candidate.name} - {this.props.rating}
        <CandidatesRatingStars />
        {this.candidateSelection()}
      </div>
    );
  }
}

CandidateCard.propTypes = {
  candidate: React.PropTypes.object.isRequired,
  rating: React.PropTypes.number,
  isFull: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  onSelectCallback: React.PropTypes.func.isRequired,
  onUnselectCallback: React.PropTypes.func.isRequired
}
