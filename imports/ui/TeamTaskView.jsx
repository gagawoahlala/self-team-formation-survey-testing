import React, { Component, PropTypes } from 'react';
import * as Const from './Constants/TeamTaskHtml.jsx';
import Iframe from 'react-iframe';
import ReactCountdownClock from 'react-countdown-clock-fork';
import PopUpButton from './PopUpButton.jsx';
import { browserHistory } from 'react-router';


export default class TeamTaskView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link: `https://beta.etherpad.org/p/${this.props.teamId}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`

    }
    this.determinePage = this.determinePage.bind(this);
    this.determineEtherpad = this.determineEtherpad.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  determinePage() {
    let page = null;
    switch (this.props.page) {
      case 1:
        page = (
          <div>
            {Const.page1}
            <div>
              <img
                src="http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg"/>
            </div>
          </div>
        );
        break;
      case 2:
        page = Const.page2;
        break;
      case 3:
        page = (
          <div>
            <PopUpButton pageToEmbed={Const.page1}/>
            <PopUpButton pageToEmbed={Const.page2}/>
            {Const.page3}
          </div>
        );
        break;
      case 4:
        page = Const.page4;
        break;
      case 5:
        page = Const.page5;
        break;
      case 6:
        page = Const.page6;
        break;
    }
    return page;

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
        <div>
          <ReactCountdownClock  seconds={this.props.timeToCount} onComplete={this.updatePage} color="#000"
            timeFormat="hms" alpha={1.0} size={70}/>
          {this.determinePage()}
        </div>
        <div>
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
  timeToCount: React.PropTypes.number.isRequired
};
