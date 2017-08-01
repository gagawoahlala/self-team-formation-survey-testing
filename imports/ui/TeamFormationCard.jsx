import React, { Component, PropTypes } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
faker = require('faker');


export default class TeamFormationCard extends Component {
  renderMember() {
    return this.props.members.map((member)=> {
      return(
        <ListGroupItem key={faker.finance.account()}>{member}</ListGroupItem>
      );
    });
  }
  render() {
    return(
      <div>
        <ListGroup>
          {this.renderMember()}
        </ListGroup>
      </div>
    );
  }
}


TeamFormationCard.propTypes = {
  members: React.PropTypes.array.isRequired
}
