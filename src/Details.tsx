import * as React from "react";
import axiosClient from "./axiosClient";

export default class Details extends React.Component {
  state = {
    selectedNegaFilmFiles: "",
    url: "",
    nega: {
      id: window.location.href.replace("http://localhost:3000/#/negas/", ""),
      title: "",
      description: ""
    }
  };

  componentDidMount() {
    axiosClient.get(`/negas/${this.state.nega.id}`).then((response: any) => {
      this.setState({
        selectedNegaFilmFiles: response.data.film_photos,
        url: "",
        nega: {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description
        }
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>{this.state.nega.title}</h1>
        <h2>
          <img width={150} src={this.state.selectedNegaFilmFiles[0]} />
        </h2>
        <p>{this.state.nega.description}</p>
      </div>
    );
  }
}
