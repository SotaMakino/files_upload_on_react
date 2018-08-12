import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <h2>Top Page</h2>
        <Link to="/negas">Index</Link>
      </div>
    );
  }
}

export default NotFound;