import React, { Component, PropTypes } from 'react';

export default class Introduction extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="intro">
        <h4> Instructions </h4>
        <p>
           We are looking for the best work and we believe that teamwork produces the best results. We are asking you to take a short survey and do some preliminary work, then select potential team members you believe will be the best partner for you or other workers. You will see information about 10 potential team members and asked to rate each one of them. You will also select the best three and order them in order of preference for working with them. You might then be paired to work with one of them further.
          <br></br>
           <b>
             Please select a potential teammate from the following candidates. Imagine you will work with this person on a creative problem-solving task.  There’s no collaboration task today, but we will implement one in the near future.
           </b>
        </p>
      </div>
    );
  }
}
