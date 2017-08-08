import React, { Component, PropTypes } from 'react';
import Iframe from 'react-iframe';
import ReactCountdownClock from 'react-countdown-clock';
import {Button, Panel} from 'react-bootstrap';
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
    			<div className="container">


      			<div id="next" className="col-md-2">
              <Button name="goToNextPage" bsStyle="danger"
                disabled={this.state.isButtonOff} onClick={this.goToExitSurvey}> Next >> </Button>
              {/* <button disabled={this.state.isButtonOn}> Next >> </button> */}
      			</div>
    			</div>
          {/* <div className="container" id="task-outline"> */}
          <Panel className="team-container" id="task-outline">
            <div className="row">
              <h1 className="col-sm-10">Task</h1><br/>
              <div id="counter" className="col-sm-2">
                Time left:
                <ReactCountdownClock  seconds={60} color="#000" alpha={1.0} size={70} onComplete={this.showButton} />
              </div>
            </div>
            <h2><b>Write a television advertisement for the transporation device you described in the earlier task.</b></h2><br/>
            <p>- the television advertisement should be 30 seconds</p><br/>
            <p>- it should highlight the product's main benefits and ultimately persuade people to buy it</p><br/>
            <p>- you can make up a new name and invent realistic features that it should have Photo of the transportation device</p><br/>
            <img src="http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg" alt="smart eBike" /><br/>
            <h1>Teamwork Directions</h1><br/>
            <h2><b>You will work collaboratively</b> to develop a great creative advertisement. Since this is teamwork, you must do all of the following to receive credit. We are monitoring your work so we can tell.</h2><br/>
            <ul><b>At the beginning, introduce yourself to your teammate</b> using the chat window on the lower right side. Click the word “Chat” to open it.</ul><br/>
            <ul><b>Start combining your ideas after 2 minutes.</b></ul><br/>
            <ul><b>Each teammate must contribute at least 35% of the work - in term of words, ideas, suggestion.</b> We want to see you combining ideas in real time</ul><br/>
            <ul><b>You must agree that you both like the direction of the work after 4 minutes.</b> This can be in the form of writing anywhere - “I like this idea” or something similar.</ul><br/>
            <ul><b>You must complete the task by 8 minutes.</b>At 8 minutes you will automatically progress to the next task.</ul><br/>
            <h1>Example</h1><br/>
            <p>Television advertisement for a new type of beverage:</p><br/>
            <p>"Scopa: Live life, one bean at a time A rugged man is free-climbing up Puncak Jaya, the highest mountain in New Guinea. He climbs effortlessly and quickly reaches the summit. Once at the top he takes a moment to admire the view surrounded by clouds and then removes a flask from his backpack, swiftly pouring a brown liquid into the cup of the flask.  Last, the scene cuts to a blank screen with writing saying: “2 beans, 2 sides, which side will you be today?”</p><br/>
          {/* </div> */}
        </Panel>

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
