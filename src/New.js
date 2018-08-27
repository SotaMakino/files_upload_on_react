import React, { Component } from 'react';
import NegaForm from './Form';

class NegaNew extends Component {
  render() {
    return (
      <div className="NegaNew col-md-8 col-md-offset-2">
        <h2>New Nega</h2>
        <NegaForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default NegaNew;