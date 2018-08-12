import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

class Home extends Component {
  render(){
    return(
        <Link to="/negas">Index</Link>
      )
  }
 }

export default Home;