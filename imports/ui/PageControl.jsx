import React, { Component } from 'react';

export default class PageControl extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.callBack();
  }

  buttonClassName(){
    let defaultClass = "page-control-btn btn btn-primary";
    if(this.props.shouldHide){
      defaultClass += " hidden";
    }
    if(!this.props.showNext){
      defaultClass += " disabled";
    }
    return defaultClass;
  }

  render(){
    return (
      <div>
        <button
          type="submit"
          className={this.buttonClassName()}
          onClick={this.handleClick}>Submit
        </button>
      </div>
    )
  }
}

PageControl.propTypes = {
  shouldHide: React.PropTypes.bool.isRequired,
  showNext: React.PropTypes.bool.isRequired,
  callBack: React.PropTypes.func.isRequired,
}
