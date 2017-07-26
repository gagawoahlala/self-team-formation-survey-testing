import React, { Component, PropTypes } from 'react';
import {Candidate} from '../api/Candidate.js';
import { createContainer } from 'meteor/react-meteor-data';
import CandidateSelectionCard from './CandidateSelectionCard.jsx';



export default class CandidateSelection extends Component {

  renderSelection() {
    if (this.props.candidates.length === 0) {
      // return
      return (
        <li className="list-group-item">
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          <pre>
            Please wait until there are at least one candidate finish the survey.
          </pre>
        </li>
      );
    } else {
      return this.props.candidates.map( (candidate) => {
        return <CandidateSelectionCard key={candidate._id} candidate={candidate}/>;
      });
    }

  }

  render() {
    return (
      <div>
        {this.renderSelection()}
      </div>
    );
  }
}


CandidateSelection.propTypes = {
  candidates: React.PropTypes.array.isRequired
}
