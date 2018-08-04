import React, { Component } from 'react';
import axiosClient from '../../axiosClient';

class NegaIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { negas: [] };
  }

  componentWillMount() {
    axiosClient.get('/negas.json').then(response => {
      this.setState({ negas: response.data });
    });
  }

  render() {
    return (
      <div className="NegaIndex col-md-12" style={{ marginTop: 10 }}>
        <div className="clearfix">
          <div className="pull-right">
            <button
              onClick={e => this.handleNewNega()}
              className="btn btn-success">
              New Nega
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Typy</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }

  handleNewNega() {
    this.props.history.push('/negas/new');
  }

  renderTableBody() {
    return this.state.negas.map(nega => {
      return (
        <tr key={nega.id}>
          <td>
            {nega.id}
          </td>
          <td>
            {nega.type}
          </td>
          <td>
            {nega.description}
          </td>
          <td>
            <button
              onClick={e => this.handleEdit(nega.id)}
              className="btn btn-primary">
              Edit
            </button>
            &nbsp;
            <button
              onClick={e => this.handleRemove(nega.id)}
              className="btn btn-danger">
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  handleEdit(negaId) {
    this.props.history.push(`/negas/${negaId}/edit`);
  }

  handleRemove(negaId) {
    let negas = this.state.negas;
    negas = negas.filter(nega => {
      return nega.id !== negaId;
    });
    this.setState({ negas: negas });
    axiosClient.delete(`/negas/${negaId}`);
  }
}

export default NegaIndex;
