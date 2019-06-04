import * as React from "react";
import axiosClient from "./axiosClient";
import styled from "@emotion/styled";

const H1 = styled("h1")`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const DIV = styled("div")`
  margin-top: 70px;
  margin-left: 100px;
`;

interface IState {
  selectedNegaFilmFiles: any;
  nega: {
    id: number;
    title: string;
    description: string;
    errors: any;
  };
  isSubmittingForm: boolean;
  didFormSubmissionComplete: boolean;
  negaFilmsField: any;
}

export default class Details extends React.Component<IState> {
  public state = {
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

  public componentDidMount() {
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

  public render() {
    return (
      <DIV>
        <H1>Title: {this.state.nega.title}</H1>
        <H1>Description: {this.state.nega.description}</H1>
        <div>
          <img width={500} src={this.state.selectedNegaFilmFiles} />
        </div>
      </DIV>
    );
  }
}
