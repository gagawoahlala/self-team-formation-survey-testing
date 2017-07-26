import React, { Component, PropTypes } from 'react';



export default class CandidateSelectionCard extends Component {
  render() {
    return (
      // <div key={this.props.candidate._id}>
      //   {this.props.candidate.selection}
      //   {this.props.candidate.rating}
      // </div>
      <div>

          {JSON.stringify(this.props.candidate.selection, null, 4)}
        
      </div>

    );
  }
}


CandidateSelectionCard.propTypes = {
  candidate: PropTypes.object.isRequired
};
