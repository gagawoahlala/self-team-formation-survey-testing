import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ReactStars from 'react-stars';

import CandidateViewPage from './CandidateViewPage.jsx';

var STAR_AMOUNT = 5;                                                                                                  // 7
var STAR_SIZE = 26;                                                                                                   // 8
var STAR_COLOR = "#E46D74"; 

export default class CandidateViewModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      rating: this.props.rating
    }

    this.onModalSave = this.onModalSave.bind(this);
    this.onStarChage = this.onStarChage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rating: nextProps.rating});
  }

  onModalSave() {
    this.props.updateCandidatesRating(this.props.candidate.id,
                                      this.state.rating);
    this.props.onModalClose();
  }

  onStarChage(newRating) {
    this.setState({rating: newRating});
  }

  render(){
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onModalClose}
          container={this}
          aria-labelledby="contained-modal-title"
          dialogClassName="candidate-view-modal"
        >
          <Modal.Header closeButton><br/></Modal.Header>
          <CandidateViewPage
            candidate={this.props.candidate}
            tester={this.props.tester}
          />
          <Modal.Footer>
            <div className="starContainer">
              <h5>How well do you think you can work together?</h5>
              <ReactStars 
                value={this.state.rating}
                count={STAR_AMOUNT} 
                size={STAR_SIZE} 
                color2={STAR_COLOR}
                onChange={this.onStarChage}
              />
            </div>
            <Button className="modal-btn"
                    bsStyle="primary"
                    onClick={this.onModalSave}>
                    Save Rating
            </Button>
            <Button className="modal-btn"
                    onClick={this.props.onModalClose}>
                    Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

CandidateViewModal.propTypes = {
  candidate: React.PropTypes.object,
  rating: React.PropTypes.number,
  tester: React.PropTypes.object.isRequired,
  show: React.PropTypes.bool.isRequired,
  updateCandidatesRating: React.PropTypes.func.isRequired,
  onModalClose: React.PropTypes.func.isRequired,
};
