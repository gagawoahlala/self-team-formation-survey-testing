import React, { Component, PropTypes } from 'react';

export default class FinishPage extends Component {
  render(){
    return (
      <div className="finish-page">
        <h4> This is a Finish Page! {this.props.code}</h4>
        <p>
           The Moocita project narrows this gap. Our team works to support
           students attaining online education, earn money while they do,
           and find them a job they love. We help our students to acquire job
           relevant skills by providing assignments for their courses that
           are real world job tasks. Students solve these tasks alone or as
           teams and get paid if the quality of their work meets the necessary
           requirements. Working on real world tasks helps students to develop
           their portfolio and keep track of their progress. Instead of grades
           students see an actual impact on their bank account and receive
           letters of recommendation from employers.
        </p>
      </div>
    )
  }
}

FinishPage.propTypes = {
  code: React.PropTypes.number.isRequired,
};
