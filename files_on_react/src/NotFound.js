import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-toolbox/lib/button/Button';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Link to='/negas'>aaa</Link>
        <Button raised primary>
          Hi!
        </Button>
      </div>
    );
  }
}

export default NotFound;