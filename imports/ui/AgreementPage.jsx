import React, { Component, PropTypes } from 'react';

import Introduction from './Introduction.jsx';

export default class AgreementPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.callBack(true);
  }

  render() {
    return (
      <div>
        <div className="header">
          <h2 className="site-logo">Teammates Selection</h2>
        </div>
        <div className="intro-page">
          <Introduction />
        </div>

      </div>
    );
  }
}
