import React, { Component, PropTypes } from 'react';

export default class IntroPage extends Component {
  constructor(props){
    super(props);
    this.hendleMturkIdChange = this.hendleMturkIdChange.bind(this);
    this.hendleNameChange = this.hendleNameChange.bind(this);
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
      this.props.callBack();
    }
  }

  hendleMturkIdChange(event) {
    this.props.updateTesterMturkId(event.target.value);
  }

  hendleNameChange(event) {
    this.props.updateTesterName(event.target.value);
  }

  couldNext(){
    return (this.props.mturkId.length > 0) &&
      (this.props.name.length > 0);
  }

  render() {
    return (
      <div className="intro-page">
        <div className="input-group">
          <input type="text" className="form-control" name="mturk_id" onChange={this.hendleMturkIdChange}
            placeholder="MTurk Id" aria-describedby="basic-addon1"/>
          <input type="text" className="form-control" name="name" onChange={this.hendleNameChange}
            placeholder="Your Name" aria-describedby="basic-addon1"/>
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
