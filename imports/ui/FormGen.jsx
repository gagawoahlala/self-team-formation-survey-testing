import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var JSON5 = require('json5');

const MALINPUT = "Informatted input detected, strings (except true/false) should be wrapped with quotes, \
no fields should be left blank. Check console for more info.";
const SUCCESS = "Data successfully collected!";

export default class FormGen extends Component {
  constructor(props){
    super(props);
    this.input = {};
    this.fields = this.getKeys();
    this.state = {popState: 0, popMsg: ""}; //0 for nothing, 1 for alert, 2 for success
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
  }
  getKeys(){
    return this.props.schema._schemaKeys.filter((k) => (!k.endsWith(".$")));
  }
  getFieldInput(k){
    let type = this.props.schema._schema[k].type.name;
    let field = null;
    if(type === "Array"){
      field = (<textarea className="form-control" rows="2" ref={(x) => {this.input[k]=x;}} defaultValue="[]"></textarea>);
    }else{
      field = <input type={type === "Number"?"number":"text"}
        className="form-control" placeholder={k} ref={(x) => {this.input[k] = x;}}/>;
    }
    return (
      <div className="form-group" key={k}>
        <label>{k}</label>
        {field}
      </div>
    );
  }
  dismissAlert(){
    this.setState({popState: 0});
  }
  renderAlert(msg){
    if(this.state.popState == 1){
      return (
        <div className="alert alert-danger" role="alert">
          <button type="button" className="close" aria-label="Close"
            onClick={this.dismissAlert}>
            <span aria-hidden="true">&times;</span></button>
            {msg}
        </div>
      );
    }else if(this.state.popState == 2){
      return (
        <div className="alert alert-success" role="alert">
          <button type="button" className="close" aria-label="Close"
            onClick={this.dismissAlert}>
            <span aria-hidden="true">&times;</span></button>
            {msg}
        </div>
      );
    }else{
      return (<div></div>);
    }

  }
  handleSubmit(e){
    e.preventDefault();
    let res = {};
    for(var i = 0; i < this.fields.length; i++){
      let field = this.fields[i];
      try{
        res[field] = JSON5.parse(this.input[field].value);
      }catch(err){
        this.setState({popState: 1, popMsg: MALINPUT});
        throw err;
      }
    }
    try{
      this.props.schema.validate(res);
      this.props.addCallback(res);
      this.setState({popState: 2, popMsg: SUCCESS});
    }catch(err){
      this.setState({popState: 1, popMsg: err.reason});
    }
  }
  render() {
    return (
      <div>
        {this.renderAlert(this.state.popMsg)}
        <form>
          {this.fields.map((k) => this.getFieldInput(k))}
          <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
