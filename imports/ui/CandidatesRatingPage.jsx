import React, { Component, PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import ReactStars from 'react-stars';

import CandidateViewPage from './CandidateViewPage.jsx';

const STAR_AMOUNT = 5;
const STAR_SIZE = 26;
const STAR_COLOR = "#E46D74";

export default class CandidatesRatingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidates: this.props.candidates,
      currIndex: 0,
      currPercentage: 0,
    };

    this.candidatesControl = this.candidatesControl.bind(this);
    this.previousBtnClassName = this.previousBtnClassName.bind(this);
    this.nextBtnClassName = this.nextBtnClassName.bind(this);
    this.updatePercentage = this.updatePercentage.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.currIndex == nextState.currIndex) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.currIndex >= this.state.candidates.length - 1){
      this.props.callBack(true);
    }
  }

  updatePercentage() {
    var percentage = (this.state.currIndex + 1) * 100 / this.state.candidates.length;
    return Math.floor(percentage);
  }

  previousBtnClassName() {
    return "candidates-control-btn btn btn-default " 
      + (this.state.currIndex == 0 ? "disabled" : "");
  }

  nextBtnClassName() {
    return "candidates-control-btn btn btn-default " 
      + (this.state.currIndex >= this.state.candidates.length - 1 ? "disabled" : "");
  }

  ratingChanged(newRating) {
    this.props.updateCandidatesRating(this.state.candidates[this.state.currIndex].mturk_id,
                                      newRating);
  }

  candidatesControl() {
    return (
      <div className="candidates-rating-and-control">
        <div className="candidates-rating">
          <h5>How well do you think you can work together?</h5>
          <div className="stars">
            <ReactStars 
              value={this.props.ratings[this.state.candidates[this.state.currIndex].mturk_id]}
              count={STAR_AMOUNT} 
              size={STAR_SIZE} 
              color2={STAR_COLOR}
              onChange={this.ratingChanged}
            />
          </div>
        </div>
        <div className="candidates-control">
          <button 
            className={this.previousBtnClassName()}
            onClick={() => {
              this.setState({ currIndex : this.state.currIndex-1 });
              window.scrollTo(0, 0);
            }}>
            Previous
          </button>
          <ProgressBar className="candidates-progress-bar"
                       now={this.updatePercentage()} 
                       label={this.updatePercentage() + "%"} 
          />
          <button 
            className={this.nextBtnClassName()} 
            onClick={() => {
              this.setState({ currIndex : this.state.currIndex+1 });
              window.scrollTo(0, 0);
            }}>
            Next
          </button>
        </div>
      </div>
    );
  }

  couldNext(){
    return true;
  }

  render() {
    return (
      <div className="">
        <CandidateViewPage 
          candidate={this.state.candidates[this.state.currIndex]}
          tester={this.props.tester}
          rating={this.props.ratings[this.state.candidates[this.state.currIndex].id]}
        />
        {this.candidatesControl()}
      </div>
    );
  }
}

CandidatesRatingPage.propTypes = {
  candidates: React.PropTypes.array.isRequired,
  tester: React.PropTypes.object.isRequired,
  ratings: React.PropTypes.object.isRequired,
  callBack: React.PropTypes.func.isRequired,
  updateCandidatesRating: React.PropTypes.func.isRequired,
}
