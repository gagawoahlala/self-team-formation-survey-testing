import React, { Component, PropTypes } from 'react';
import ReactStars from 'react-stars';

const STAR_AMOUNT = 5;
const STAR_SIZE = 22;
const STAR_COLOR = "#E46D74";

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
                  className="control-btn btn btn-default btn-danger"
                  onClick={this.props.onUnselectCallback.bind(null, this.props.candidate)}
                >
                  Unselect
                </button>);
    } else {
      button = (<button 
                  disabled={this.props.isFull && !this.props.isSelected}
                  className="control-btn btn btn-default btn-primary"
                  onClick={this.props.onSelectCallback.bind(null, this.props.candidate)}>
                  Select
                </button>);
    }
    return button;
  }

  render() {
        // CandidateCard - {this.props.candidate.name} - {this.props.rating}
    return (
      <div className="candidate-card">
        {!this.props.rating &&
          <span className="no-rating-warning">No Rating</span>}
        <div className="candidate-card-left">
          <span><h4>{this.props.candidate.name}</h4></span>
          <ReactStars 
            value={this.props.rating}
            count={STAR_AMOUNT} 
            size={STAR_SIZE} 
            color2={STAR_COLOR}
            edit={false}
          />
        </div>
        <div className="candidate-card-right">
          {this.candidateSelection()}
          <button
            className="control-btn btn btn-default btn-primary"
            onClick={this.props.onCandidateViewClick.bind(null, this.props.candidate)}>
            View
          </button>
        </div>
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
  onUnselectCallback: React.PropTypes.func.isRequired,
  updateCandidatesRating: React.PropTypes.func.isRequired,
  onCandidateViewClick: React.PropTypes.func.isRequired,
}
