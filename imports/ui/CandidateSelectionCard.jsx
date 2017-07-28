import React, { Component, PropTypes } from 'react';
import { Button, Collapse, Well} from 'react-bootstrap';




export default class CandidateSelectionCard extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Button bsSize="large" onClick={ ()=> this.setState({ open: !this.state.open })} block>
          {this.props.candidate.mturk_id}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              <div>
                {JSON.stringify(this.props.candidate.selection, null, 4)}
              </div>
              <div>
                {JSON.stringify(this.props.candidate.rating, null, 4)}
              </div>
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}


CandidateSelectionCard.propTypes = {
  candidate: PropTypes.object.isRequired
};
