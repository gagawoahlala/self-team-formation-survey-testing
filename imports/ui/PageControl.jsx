import React, { Component } from 'react';
import * as Const from './Constants/Constants.jsx';

export default class PageControl extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    if(!this.props.showNext) {
      if (this.props.currentPage === Const.SUMMARY_PAGE) {
        alert('Please rate all candidates and select three potential teamates!');
      } else {
        alert('Please check the "I agree”.');
      }  
    } else {
      this.props.callBack();
    }
  }

  buttonClassName(){
    let defaultClass = "page-control-btn btn btn-success";
    if(this.props.shouldHide){
      defaultClass += " hidden";
    }
    // if(!this.props.showNext){
    //   defaultClass += " disabled";
    // }
    return defaultClass;
  }

  render(){
    return (
      <div className="page-control">
        <button
          type="submit"
          className={this.buttonClassName()}
          onClick={this.handleClick}>Next
        </button>
      </div>
    )
  }
}

PageControl.propTypes = {
  shouldHide: React.PropTypes.bool.isRequired,
  showNext: React.PropTypes.bool.isRequired,
  callBack: React.PropTypes.func.isRequired,
  currentPage: React.PropTypes.number.isRequired
}
