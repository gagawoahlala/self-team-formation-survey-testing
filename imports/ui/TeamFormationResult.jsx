import React, { Component, PropTypes } from 'react';
import TeamFormationCard from './TeamFormationCard';

export default class TeamFormationResult extends Component {
  renderTeam() {
    return this.props.teams.map((team) => {
      return (
        <div>
          {team.team_id}
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
