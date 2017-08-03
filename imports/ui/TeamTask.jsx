import React, { Component, PropTypes } from 'react';
import Iframe from 'react-iframe';
import ReactCountdownClock from 'react-countdown-clock';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';


export default class TeamTask extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isButtonOff: true,
        link: `https://beta.etherpad.org/p/${this.props.teamId}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`
      }
      this.showButton = this.showButton.bind(this);
    }


  	showButton(){
  		this.setState({isButtonOff: false});
  	}

    goToExitSurvey() {
      browserHistory.push('/exitsurvey');
    }
  	render(){
  		return(
        <div>
    			<div id="whole" >
      			<div id="counter" className="col-md-2">
      				<ReactCountdownClock  seconds={10} color="#000" alpha={1.0} size={70} onComplete={this.showButton} />
      			</div>
      			<div id="paragraph" className="col-md-2">
      				<p>Insert Pararaph here</p>
      			</div>
      			<div id="next" className="col-md-2">
              <Button name="goToNextPage" bsStyle="danger"
                disabled={this.state.isButtonOff} onClick={this.goToExitSurvey}> Next >> </Button>
              {/* <button disabled={this.state.isButtonOn}> Next >> </button> */}

      			</div>

    			</div>

          <div id="frame">
            <Iframe url={this.state.link}  width="1280px" height="720px" display="initial" position="relative" allowFullScreen/>
          </div>
        </div>

  			);
  	}

}

TeamTask.propTypes = {
  teamId: React.PropTypes.string.isRequired,
};
