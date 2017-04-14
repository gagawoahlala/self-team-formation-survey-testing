import React, { Component, PropTypes } from 'react';

export default class FinishPage extends Component {
  render(){
    return (
      <div className="finish-page">
        <h4> Finish! {this.props.code}</h4>
        <p>
           Thank you so much for your participation. 
        </p>
      </div>
    )
  }
}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
};
