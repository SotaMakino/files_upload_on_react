import * as React from "react";
import axiosClient from "./axiosClient";
import Button from "react-toolbox/lib/button/Button";
import { History } from "history";

interface IProps {
  history: History;
  match: any;
}

interface IState {
  negas: any[];
}

export default class NegaList extends React.Component<IProps, IState> {
  state = { negas: [] };

  componentDidMount() {
    axiosClient.get("/negas.json").then((response: any) => {
      this.setState({ negas: response.data });
    });
  }

  public render() {
    return (
      <div style={{ marginTop: 30, marginLeft: 100 }}>
        <div>
          <div className="pull-right">
            <Button
              primary
              icon="add"
              onClick={(e: any) => this.handleNewNega()}
              className="btn btn-success"
            >
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
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }

  private handleNewNega() {
    this.props.history.push("/negas/new");
  }

  private handleEdit(negaId: number) {
    this.props.history.push(`/negas/${negaId}/edit`);
  }

  private handleRemove(negaId: number) {
    let negas = this.state.negas;
    negas = negas.filter((nega: any) => {
      return nega.id !== negaId;
    });
    this.setState({ negas: negas });
    axiosClient.delete(`/negas/${negaId}`);
  }

  private renderTableBody() {
    return this.state.negas.map((nega: any) => {
      return (
        <tr key={nega.id}>
          <td>
            <img
              src={nega.film_photos[0].url.replace(
                /\/\/negabook-server.herokuapp.com/g,
                ""
              )}
              width={100}
              height={100}
            />
          </td>
          <td>{nega.id}</td>
          <td>{nega.title}</td>
          <td>{nega.description}</td>
          <td>
            <Button
              icon="edit"
              onClick={(e: any) => this.handleEdit(nega.id)} //questionable change
            />
            &nbsp;
            <Button
              icon="delete"
              onClick={(e: any) => this.handleRemove(nega.id)} //questionable change
            />
          </td>
        </tr>
      );
    });
  }
}
