import React, { Component, PropTypes } from 'react';
import * as Const from './Constants/TeamTaskHtml.jsx';
import Iframe from 'react-iframe';
import ReactCountdownClock from 'react-countdown-clock-fork';
import PopUpButton from './PopUpButton.jsx';
import { browserHistory } from 'react-router';
faker = require('faker');


export default class TeamTaskView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link : `http://etherpad.ucsd.edu:9006/p/${this.props.teamId}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`
      // link: `https://beta.etherpad.org/p/${this.props.teamId}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`

    }
    this.determinePage = this.determinePage.bind(this);
    this.determineEtherpad = this.determineEtherpad.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.displaySlogans = this.displaySlogans.bind(this);
  }

  determinePage() {
    let page = null;
    switch (this.props.page) {
      case 1:
        page = (
          <div >
            {Const.page1WithImg}

          </div>
        );
        break;
      case 2:
      page = (
        <div className="page-box">
          <div className="border-box">
            {Const.page2}
          </div>
        </div>
      );
        break;
      case 3:
        page = (
          <div className="page-box">
            <div className="button-box">
              <PopUpButton pageToEmbed={Const.page1} textToShow={"Click to show task"}/>
              <PopUpButton pageToEmbed={Const.page2} textToShow={"Click to show directions"}/>
            </div>
            <div className="border-box">
              {Const.page3}
              <div className="slogan-container">
                <div className="slogan-box">
                  {this.displaySlogans()}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 4:
        page = (
          <div className="page-box">
            <div className="button-box">
              <PopUpButton pageToEmbed={Const.page1} textToShow={"Click to show task"}/>
              <PopUpButton pageToEmbed={Const.page2} textToShow={"Click to show directions"}/>
            </div>
            <div className="border-box">
              {Const.page4}
              <div className="slogan-container">
                <div className="slogan-box">
                  {this.displaySlogans()}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 5:
        page = (
          <div className="page-box">
            <div className="button-box">
              <PopUpButton pageToEmbed={Const.page1} textToShow={"Click to show task"}/>
              <PopUpButton pageToEmbed={Const.page2} textToShow={"Click to show directions"}/>
            </div>
            <div className="border-box">
              {Const.page5}
              <div className="slogan-container">
                <div className="slogan-box">
                  {this.displaySlogans()}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 6:
        page = (
          <div className="page-box">
            <div className="button-box">
              <PopUpButton pageToEmbed={Const.page1} textToShow={"Click to show task"}/>
              <PopUpButton pageToEmbed={Const.page2} textToShow={"Click to show directions"}/>
            </div>
            <div className="border-box">
              {Const.page6}
              <div className="slogan-container">
                <div className="slogan-box">
                  {this.displaySlogans()}
                </div>
              </div>
            </div>
          </div>
        );
        break;
    }
    return page;

  }

  displaySlogans() {
    return this.props.slogans.map((slogan) => {
      return <div className="slogan" key={faker.finance.account()}>Candidate {this.props.slogans.indexOf(slogan)}:"{slogan}"</div>;
    });
  }

  determineEtherpad() {
    if (this.props.page > 2) {
      return(
        <div id="frame">
          <Iframe url={this.state.link}  width="1280px" height="720px" display="initial" position="relative" allowFullScreen/>
        </div>
      );

    }
  }

  updatePage() {
    if (this.props.page <= 6) {
      this.props.pageCallBack(this.props.page + 1);
    } else {
      browserHistory.push('/exitsurvey');
    }
  }


  render() {
    return(
      <div>
        <div className="center-timer-teamtask">
          <ReactCountdownClock  seconds={this.props.timeToCount} onComplete={this.updatePage} color="#000"
            timeFormat="hms" alpha={1.0} size={70}/>
        </div>
        {this.determinePage()}
        <div className="etherpad-box">
          {this.determineEtherpad()}
        </div>
      </div>
    );
  }

}

TeamTaskView.propTypes = {
  page: React.PropTypes.number.isRequired,
  teamId: React.PropTypes.string.isRequired,
  pageCallBack: React.PropTypes.func.isRequired,
  timeToCount: React.PropTypes.number.isRequired,
  slogans: React.PropTypes.array.isRequired

};
