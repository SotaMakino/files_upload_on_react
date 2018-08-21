import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Link to='/negas'>aaa</Link>
      </div>
    );
  }
}

export default NotFound;