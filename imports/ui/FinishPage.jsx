import React, { Component, PropTypes } from 'react';

export default class FinishPage extends Component {
  render(){
    return (
      <div className="finish-page">
        <h4>You're finished!</h4>
        <p>
          Please copy this code ({this.props.code}) and place it into the text box in Mechanical Turk in order to get paid.  Thank you for your participation.
        </p>
      </div>
    )
  }
}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
};
