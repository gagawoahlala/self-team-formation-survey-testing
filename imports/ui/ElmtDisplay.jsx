import React, { Component, PropTypes } from 'react';

export default class ElmtDisplay extends Component {
  render(){
    return (
      <li className="list-group-item">
        <span className="glyphicon glyphicon-remove" aria-hidden="true"
          onClick={() => this.props.deleteCallback(this.props.element._id)}></span>
        <pre>
          {JSON.stringify(this.props.element, null, 4)}
        </pre>
      </li>
    )
  }
}

// ElmtDisplay.propTypes = {
//   element: PropTypes.object.isRequired,
//   deleteCallback: PropTypes.func.isRequired,
// };
