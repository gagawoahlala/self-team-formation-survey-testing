import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Block} from '../api/Block.js';
import MongoConsole from './MongoConsole.jsx';

class AdminBlock extends Component{
  render(){
    return (
      <div>
        <MongoConsole model={Block} items={this.props.blocks}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    blocks: Block.find({}).fetch(),
  };
}, AdminBlock);
