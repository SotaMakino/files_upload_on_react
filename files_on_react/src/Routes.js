import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from './Header';
import * as axios from './axiosClient';
import './Routes.css';

const history = createBrowserHistory();

class Routes extends Component {

  constructor() {
    super();
    this.state = {
     info: null
   };

  }

  fetchUserDetails() {
    axios.fetchUserDetails({ token: this.props.token })
      .then(info => {
        this.setState({ info })
      });
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    const { info } = this.state;
    return(
      <div className='Routes'>
        <Router history={history}>
            <div>
            <Header info={info}/>
            </div>
        </Router>
      </div>
    );
  }

}


export default Routes;