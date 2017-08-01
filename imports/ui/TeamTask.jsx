import React, { Component, PropTypes } from 'react';
import Iframe from 'react-iframe';
import ReactCountdownClock from 'react-countdown-clock';
import {Button} from 'react-bootstrap';


export default class TeamTask extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isButtonOff: true
      }
      this.showButton = this.showButton.bind(this);
    }


  	showButton(){
  		this.setState({isButtonOff: false});
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
                disabled={this.state.isButtonOff}> Next >> </Button>
              {/* <button disabled={this.state.isButtonOn}> Next >> </button> */}

      			</div>

    			</div>

          <div id="frame">
            <Iframe url="https://beta.etherpad.org/p/Test1?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false"  width="1280px" height="720px" display="initial" position="relative" allowFullScreen/>
          </div>
        </div>

  			);
  	}

}
