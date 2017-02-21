import React, { Component, PropTypes } from 'react';
import CandidatesViewPage from './CandidateViewPage.jsx';
import CandidatesRatingStars from './CandidatesRatingStars.jsx';

export default class CandidatesRatingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidates: this.props.candidates,
      currIndex: 0
    };
    this.candidatesControl = this.candidatesControl.bind(this);
    this.previousBtnClassName = this.previousBtnClassName.bind(this);
    this.nextBtnClassName = this.nextBtnClassName.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.currIndex == nextState.currIndex) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.currIndex >= this.state.candidates.length - 1){
      this.props.callBack();
    }
  }

  previousBtnClassName() {
    return "btn btn-default " 
      + (this.state.currIndex == 0 ? "disabled" : "");
  }

  nextBtnClassName() {
    return "btn btn-default " 
      + (this.state.currIndex >= this.state.candidates.length - 1 ? "disabled" : "");
  }

  candidatesControl() {
    return (
      <div className="candidates_control">
        <CandidatesRatingStars />
        <button 
          className={this.previousBtnClassName()}
          onClick={() => {this.setState({ currIndex : this.state.currIndex-1 });}}>
          Previous
        </button>
        <button 
          className={this.nextBtnClassName()} 
          onClick={() => {this.setState({ currIndex : this.state.currIndex+1 });}}>
          next
        </button>
      </div>
    );
  }

  couldNext(){
    return true;
  }

  render() {
    return (
      <div className="">
        <CandidatesViewPage 
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
  callBack: React.PropTypes.func.isRequired,
  ratings: React.PropTypes.object.isRequired
}
