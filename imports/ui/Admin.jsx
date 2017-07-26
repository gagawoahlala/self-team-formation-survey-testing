import React, { Component } from 'react';

import AdminCandidate from './AdminCandidate.jsx';
import AdminQuestion from './AdminQuestion.jsx';
import AdminTeamFormation from './AdminTeamFormation.jsx';


const mapping = {"Candidates": <AdminCandidate />,
                "Questions": <AdminQuestion />,
                "TeamFormation": <AdminTeamFormation/>
                };
// const mapping = {"Candidates": <MongoConsole model={Candidate}/>, "Questions": <MongoConsole />};

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {active: "Candidates"};
    this.changeActive = this.changeActive.bind(this);
  }
  changeActive(k){
    this.setState({active: k});
  }
  getNav() {
    let lis = Object.keys(mapping).map((k) =>
      <li key={k} role="presentation" className={k===this.state.active?"active":""}
        onClick={() => this.changeActive(k)}>
        <a href='#'> {k} </a>
      </li>
    )
    return (
      <ul className="nav nav-tabs">
        {lis}
      </ul>
    );
  }
  render() {
    return (
      <div>
        {this.getNav()}
        {mapping[this.state.active]}
      </div>
    );
  }
}
