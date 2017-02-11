import React, { Component } from 'react';

import IntroPage from './IntroPage.jsx';
import PageControl from './PageControl.jsx';

// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      showNext: false
    }

    this.approveNext = this.approveNext.bind(this);
    this.advanceNext = this.advanceNext.bind(this);
  }

  determinePage() {
    let curPage;
    if(this.state.currentPage === 2){
      curPage = (<div>page 2</div>);
    }else if(this.state.currentPage === 3 ){
      curPage = (<div>page 3</div>);
    }else {
      curPage = (<IntroPage data={this.props.data["intro"]} callBack={this.approveNext}/>);
    }
    return curPage;
  }

  approveNext() {
    this.setState({showNext: true});
  }

  advanceNext() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage + 1,
      showNext: false
    }));
  }

  render() {
    // 1. intro page
    // 2. people iterator page
    // 3. summary page
    return (
      <div className="container">
        {this.determinePage()}
        <PageControl showNext={this.state.showNext} callBack={this.advanceNext}/>
    </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.object.isRequired
}
