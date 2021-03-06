import * as React from "react";
import axiosClient from "./axiosClient";
import Button from "react-toolbox/lib/button/Button";
import "./Main.css";
import { History } from "history";
import { Link } from "react-router-dom";

interface IProps {
  history: History;
  match: any;
}

interface IState {
  negas: any;
}

export default class Main extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    negas: []
  };

  public handleNew() {
    this.props.history.push("/negas/new");
  }

  public componentDidMount() {
    axiosClient.get("/negas.json").then((response: any) => {
      this.setState({ negas: response.data });
    });
  }

  public render() {
    return (
      <div>
        <div>{this.renderAllNegaFilmFiles()}</div>
        <div className="Main-button">
          <Button
            icon="add"
            floating
            accent
            onClick={this.handleNew.bind(this)}
          />
        </div>
      </div>
    );
  }

  public renderAllNegaFilmFiles() {
    return this.state.negas.map((nega: any) => {
      return (
        <Link to={`negas/details/${nega.id}`}>
          <img
            src={nega.film_photos[0].url.replace(
              /\/\/negabook-server.herokuapp.com/g,
              ""
            )}
            width={288}
            height={350}
          />
        </Link>
      );
    });
  }
}
