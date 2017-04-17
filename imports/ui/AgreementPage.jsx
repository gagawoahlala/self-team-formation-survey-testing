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
      <div className="intro-page">
        <Introduction />
      </div>
    );
  }
}
