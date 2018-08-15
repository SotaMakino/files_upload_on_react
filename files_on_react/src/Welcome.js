import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render(){
    return(
    	<div className="Welcome">
    	  <h1>Welcome</h1>
            <div>
            <Link to="/negas">Index</Link>
            </div>
        </div>
      );
  }
 }

export default Welcome;