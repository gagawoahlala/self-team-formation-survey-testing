import React, { Component, PropTypes } from 'react';

import Introduction from './Introduction.jsx';

export default class AgreementPage extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.couldNext = this.couldNext.bind(this);
    this.state = {checked: true};
  }

  handleInputChange(e) {
    this.setState({checked: !this.state.checked});
    if (this.couldNext()){
        this.props.callBack(true);
      } else {
        this.props.callBack(false);
      }
  }
  couldNext(){
    return this.state.checked;
  }
  render() {
    return (
      <div className="intro-page">
        <Introduction />
        <div className="checkbox">
          <label>
            <input type="checkbox"
                   onChange={this.handleInputChange}/>
                 I agree to the terms and conditions
         </label>
        </div>
      </div>
    );
  }
}
