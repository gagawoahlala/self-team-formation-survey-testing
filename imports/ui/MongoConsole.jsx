import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ElmtDisplay from './ElmtDisplay.jsx'
import FormGen from './FormGen.jsx';

export default class MongoConsole extends Component {
  addItem(item){
    console.log(this.props);
    this.props.model.insert(item);
  }
  deleteItem(id){
    this.props.model.remove(id);
  }
  renderItems(){
    return this.props.items.map((c) =>
      <ElmtDisplay key={c._id} element={c} deleteCallback={this.deleteItem.bind(this)}/>);
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-6">
          <FormGen schema={this.props.model.schema} addCallback={this.addItem.bind(this)}/>
        </div>
        <div className="col-sm-6">
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
