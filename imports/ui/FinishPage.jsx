import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';


export default class FinishPage extends Component {
  processInparams(){
    let query = this.props.location.query;

    let userInDatabase = query["mturk_id"];
    // console.log(testertest);

    // console.log(resultAfterProcess);
    if(userInDatabase != null){
      this.setState({
        isParamValid: true,
        testerMturkId: query["mturk_id"],
        tester : userInDatabase
      });
    } else {
      this.setState({isParamValid: false});
    }
  }
  render(){
    return (
      <div className="finish-page">
        <h4>You're finished!</h4>
        <p>
          Please copy this code <b>({this.props.code})</b> and place it into the text box in Mechanical Turk in order to get paid.  Thank you for your participation.
        </p>
      </div>
    )
  }
}

FinishPage.propTypes = {
  code: React.PropTypes.string.isRequired,
};
