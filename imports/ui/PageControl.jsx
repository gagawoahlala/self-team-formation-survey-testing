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
    let defaultClass = "btn btn-default";
    if(!this.props.showNext){
      defaultClass += " disabled"
    }
    return defaultClass;
  }

  render(){
    return (
      <button type="submit" className={this.buttonClassName()} onClick={this.handleClick}>Submit</button>
    )
  }
}

PageControl.propTypes = {
  showNext: React.PropTypes.bool.isRequired,
  callBack: React.PropTypes.func.isRequired
}
