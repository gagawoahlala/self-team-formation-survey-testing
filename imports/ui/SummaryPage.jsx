import React, { Component, PropTypes } from 'react';
import CandidateCard from './CandidateCard.jsx';

const MAX_SELECTION = 3;

export default class SummaryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selection: {},
      currSelection: 0,
    };

    this.prepareData = this.prepareData.bind(this);
    this.showCandidates = this.showCandidates.bind(this);
    this.onSelectCallback = this.onSelectCallback.bind(this);
    this.onUnselectCallback = this.onUnselectCallback.bind(this);
    this.orderSelectedCandidates = this.orderSelectedCandidates.bind(this);
  }

  componentWillMount() {
    this.prepareData();
  }

  prepareData() {
    tempSelection = {}
    for (var i = this.props.candidates.length - 1; i >= 0; i--) {
      tempSelection[this.props.candidates[i].id] = false;
    }
    this.setState({selection: tempSelection});
  }

  showCandidates() {
    return (this.props.candidates.map((candidate) => 
      <CandidateCard 
        key={candidate.id}
        candidate={candidate}
        rating={this.props.ratings[candidate.id]}
        isFull={this.state.currSelection == MAX_SELECTION}
        isSelected={this.state.selection[candidate.id]}
        onSelectCallback={this.onSelectCallback}
        onUnselectCallback={this.onUnselectCallback}
      />
    ));
  }

  orderSelectedCandidates() {
    return (
      this.props.candidates
          .filter((candidate) => {return this.state.selection[candidate.id]})
          .map((candidate) => (
            <p key={candidate.id}>{candidate.name}</p>
          )));
  }

  onSelectCallback(user) {
    this.state.selection[user.id] = true;
    this.setState({currSelection : this.state.currSelection + 1})
  }

  onUnselectCallback(user) {
    this.state.selection[user.id] = false;
    this.setState({currSelection : this.state.currSelection - 1})
  }

  render() {
    return (
      <div className="summary-page">
        <h4>Please Choose 3 Teammate Candidates:</h4>
        {this.showCandidates()}
        {this.orderSelectedCandidates()}
      </div>
    );
  }
}

SummaryPage.propTypes = {
  candidates: React.PropTypes.array.isRequired,
  ratings: React.PropTypes.object.isRequired,
}
