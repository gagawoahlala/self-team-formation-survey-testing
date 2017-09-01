import {Button, Modal} from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';


export default class PopUpButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        > {this.props.textToShow}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
          {this.props.pageToEmbed}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}


PopUpButton.propTypes = {
  // page: React.PropTypes.number.isRequired,
  // teamId: React.PropTypes.string.isRequired,
  // pageCallBack: React.PropTypes.func.isRequired,
  // timeToCount: React.PropTypes.number.isRequired
  textToShow: React.PropTypes.string
};
