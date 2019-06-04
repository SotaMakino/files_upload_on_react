import * as React from "react";
import axiosClient from "./axiosClient";

export default class Details extends React.Component {
  state = {
    selectedNegaFilmFiles: "",
    nega: {
      id: window.location.href.replace(
        "http://localhost:3000/#/negas/details/",
        ""
      ),
      title: "",
      description: ""
    }
  };

  componentDidMount() {
    axiosClient.get(`/negas/${this.state.nega.id}`).then((response: any) => {
      this.setState({
        selectedNegaFilmFiles: response.data.film_photos[0].url.replace(
          "negabook-server.herokuapp.com//",
          ""
        ),
        nega: {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.nega.title}</h1>
        <h2>
          <img width={150} src={this.state.selectedNegaFilmFiles} />
        </h2>
        <p>{this.state.nega.description}</p>
      </div>
    );
  }
}
