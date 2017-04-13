import React, { Component, PropTypes } from 'react';

import Introduction from './Introduction.jsx';

export default class AgreementPage extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.couldNext = this.couldNext.bind(this);
  }
  componentDidMount(){
    this.setState({checked: false});
  }
  componentDidUpdate() {
    if (this.couldNext()){
      this.props.callBack(true);
    } else {
      this.props.callBack(false);
    }
  }
  handleInputChange(e) {
    this.setState((prevState, props) => ({
      checked: !prevState.checked
    }));
  }
  couldNext(){
    // console.log(this.state.checked);
    return this.state.checked;
  }
  render() {
    return (
      <div className="intro-page">
        <Introduction />
        <div className="checkbox">
          <label>
            <input type="checkbox"
                   name="check"
                   onChange={this.handleInputChange} />
                 I agree to the terms and conditions
         </label>
        </div>
      </div>
    );
  }
}
