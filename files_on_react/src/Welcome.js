import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-toolbox/lib/button/Button';

class Welcome extends Component {
  render(){
    return(
    	<div className="Welcome">
    	  <h1>Negabook</h1>
            <Button raised primary>
              Hi!
            </Button>
            <div>
            <Link to="/negas">Index</Link>
            </div>
        </div>
      );
  }
 }

export default Welcome;