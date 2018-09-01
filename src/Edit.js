import React, { Component } from 'react';
import NegaForm from './Form';

class NegaEdit extends Component {
  render() {
    return (
      <div>
        <h2>Edit Nega</h2>
        <NegaForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default NegaEdit;