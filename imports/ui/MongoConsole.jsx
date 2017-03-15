import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ElmtDisplay from './ElmtDisplay.jsx'
import FormGen from './FormGen.jsx';
var FileSaver = require('file-saver');

export default class MongoConsole extends Component {
  addItem(items){
    // this.props.model.insert(item);
    if(items instanceof Array){
      for(let i = 0; i < items.length; i ++){
        this.props.model.schema.validate(items[i]);
        if(this.props.model.find(items[i]).count() == 0){
          this.props.model.insert(items[i]);
        }
      }
    }else{
      throw {reason: "expecting an array!"};
    }
  }
  deleteItem(id){
    this.props.model.remove(id);
  }
  renderItems(){
    return this.props.items.map((c) =>
      <ElmtDisplay key={c._id} element={c} deleteCallback={this.deleteItem.bind(this)}/>);
  }
  downloadItems(){
    var blob = new Blob([JSON.stringify(this.props.items)], {type: "application/json;charset=utf-8"});
    FileSaver.saveAs(blob, "result.json");
  }
  removeAll(){
    for(let i = 0; i < this.props.items.length; i ++){
      this.deleteItem(this.props.items[i]._id);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-6">
          <FormGen schema={this.props.model.schema} addCallback={this.addItem.bind(this)}/>
        </div>
        <div className="col-sm-6">
          <button onClick={this.downloadItems.bind(this)}> download </button>
          <button onClick={this.removeAll.bind(this)}> remove all </button>
          <ul className="list-group">
            {this.renderItems()}
          </ul>
        </div>
      </div>
    )
  }
}

MongoConsole.propTypes = {
  model: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};
