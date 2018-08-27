import React, { Component } from 'react';
import NegaForm from './Form';

class NegaEdit extends Component {
  render() {
    return (
      <div className="NegaEdit col-md-8 col-md-offset-2">
        <h2>Edit Nega</h2>
        <NegaForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default NegaEdit;