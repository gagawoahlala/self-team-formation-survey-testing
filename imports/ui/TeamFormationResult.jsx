import React, { Component, PropTypes } from 'react';
import TeamFormationCard from './TeamFormationCard';
faker = require('faker');


export default class TeamFormationResult extends Component {
  renderTeam() {
    return this.props.teams.map((team) => {
      return (
        <div key={faker.finance.account()}>
          <div>{team.team_id}</div>
          <TeamFormationCard key={team._id} members={team.members}/>
        </div>
      );
    });
  }
  render() {
    return(
      <div>
          {this.renderTeam()}
      </div>

    );
  }
}


TeamFormationResult.propTypes = {
  teams: React.PropTypes.array.isRequired
}
