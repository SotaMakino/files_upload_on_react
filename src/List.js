import React, { Component } from 'react';
import axiosClient from './axiosClient';
import Button from 'react-toolbox/lib/button/Button';

export default class NegaList extends Component {
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
      <div className="col-md-12" style={{ marginTop: 30 }}>
        <div className="clearfix">
          <div className="pull-right">
            <Button
              primary
              icon='add'
              onClick={e => this.handleNewNega()}
              className="btn btn-success">
              New Nega
            </Button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
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

  renderTableBody() {
    return this.state.negas.map(nega => {
      return (
        <tr key={nega.id}>
          <td>
          <img
            src={nega.film_photos[0].url.replace(/\/\/negabook-server.herokuapp.com/g, '')}
            width={50}
            height={50}
          />
          </td>
          <td>
            {nega.id}
          </td>
          <td>
            {nega.title}
          </td>
          <td>
            {nega.description}
          </td>
          <td>
            <Button
              icon='edit'
              onClick={e => this.handleEdit(nega.id)}
            >
            </Button>
            &nbsp;
            <Button
              icon='delete'
              onClick={e => this.handleRemove(nega.id)}
            >
            </Button>
          </td>
        </tr>
      );
    });
  }

}