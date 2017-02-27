import React, { Component, PropTypes } from 'react';

import Introduction from './Introduction.jsx';

export default class IntroPage extends Component {
  constructor(props){
    super(props);
    this.handleMturkIdChange = this.handleMturkIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mturkId == nextProps.mturkId &&
      this.props.name == nextProps.name) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.couldNext()){
      this.props.callBack(true);
    } else {
      this.props.callBack(false);
    }
  }

  handleMturkIdChange(event) {
    this.props.updateTesterMturkId(event.target.value);
  }

  handleNameChange(event) {
    this.props.updateTesterName(event.target.value);
  }

  couldNext(){
    return (this.props.mturkId.length > 0) &&
      (this.props.name.length > 0);
  }

  render() {
    return (
      <div className="intro-page">
        <Introduction />
        <div className="input-group">
          <input type="text" 
                 className="form-control tester-info-input"
                 name="mturk_id"
                 onChange={this.handleMturkIdChange}
                 placeholder="MTurk Id"
                 aria-describedby="basic-addon1"/>
          <input type="text"
                 className="form-control tester-info-input"
                 name="name"
                 onChange={this.handleNameChange}
                 placeholder="Your Name"
                 aria-describedby="basic-addon1"/>
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  mturkId: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  callBack: React.PropTypes.func.isRequired,
  updateTesterMturkId: React.PropTypes.func.isRequired,
  updateTesterName: React.PropTypes.func.isRequired,
}
