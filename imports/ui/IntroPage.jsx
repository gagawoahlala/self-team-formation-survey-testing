import React, { Component, PropTypes } from 'react';

export default class IntroPage extends Component {
  constructor(props){
    super(props);
    this.state = {data: props["data"]};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let prevState = this.state;
    this.props["data"][name] = target.value;

    this.setState({
      "data": this.props["data"]
    });

    if(this.couldNext()){
      this.props.callBack();
    }
  }

  couldNext(){
    return (this.state.data.mturk_id.length > 0) &&
      (this.state.data.name.length > 0);
  }

  render() {
    return (
      <div className="intro-page">
        <div className="input-group">
          <input type="text" className="form-control" name="mturk_id" onChange={this.handleInputChange}
            placeholder="MTurk Id" aria-describedby="basic-addon1" value={this.state.data.mturk_id}/>
          <input type="text" className="form-control" name="name" onChange={this.handleInputChange}
            placeholder="Your Name" aria-describedby="basic-addon1" value={this.state.data.name}/>
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  data: React.PropTypes.object.isRequired,
  callBack: React.PropTypes.func.isRequired
}
