import * as React from "react";
import axiosClient from "./axiosClient";
import Button from "react-toolbox/lib/button/Button";
import Dialog from "react-toolbox/lib/dialog/Dialog";
import ProgressBar from "react-toolbox/lib/progress_bar";
import "./Form.css";
import { History } from "history";

interface IProps {
  history: History;
  match: any;
}

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

export default class NegaForm extends React.Component<IProps, IState> {
  public state: IState = {
    selectedNegaFilmFiles: [],
    nega: {
      id: this.props.match.params.id,
      title: "",
      description: "",
      errors: {}
    },
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    negaFilmsField: []
  };

  // for Edit and Update
  public componentDidMount() {
    if (this.props.match.params.id) {
      axiosClient
        .get(`/negas/${this.props.match.params.id}`)
        .then((response: any) => {
          this.setState({
            selectedNegaFilmFiles: response.data.film_photos,
            nega: {
              id: response.data.id,
              title: response.data.title,
              description: response.data.description,
              errors: {}
            }
          });
        });
    }
  }

  public render() {
    console.log(this.state);
    return (
      <Dialog title="New Nega" active={true}>
        <div>
          <label>Title</label>
          <input
            type="text"
            onChange={e => this.handleNegaTitleChange(e)}
            value={this.state.nega.title}
            className="form-control"
          />
          {this.renderNegaTitleError()}
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            onChange={e => this.handleNegaDescriptionChange(e)}
            value={this.state.nega.description}
            className="form-control"
          />
          {this.renderNegaDescriptionError()}
        </div>
        <div className="NegaForm">
          <label>Photo</label>
          {this.renderUploadFilmsButton()}
          {this.renderSelectedNegaFilmFiles()}
        </div>
        {this.renderUploadingProgress()}
        {this.renderNegaFilmError()}
        <Button
          raised
          accent
          disabled={this.state.isSubmittingForm}
          onClick={(e: any) => this.handleFormSubmit()} //questionable change
          className="btn btn-primary"
        >
          {this.state.isSubmittingForm ? "Saving..." : "Save"}
        </Button>
        &nbsp;
        <Button
          disabled={this.state.isSubmittingForm}
          onClick={(e: any) => this.handleCancel()} //questionable change
          className="btn btn-default"
        >
          Cancel
        </Button>
        <br />
      </Dialog>
    );
  }

  private handleNegaTitleChange(e: React.FormEvent<HTMLInputElement>) {
    const { nega } = this.state;
    nega.title = e.currentTarget.value;
    this.setState({ nega: nega });
  }

  private handleNegaDescriptionChange(e: React.FormEvent<HTMLInputElement>) {
    const { nega } = this.state;
    nega.description = e.currentTarget.value;
    this.setState({ nega: nega });
  }

  private renderNegaTitleError(): any {
    if (this.state.nega.errors.title) {
      return <div>{this.state.nega.errors.title}</div>;
    }
  }

  private renderNegaDescriptionError(): any {
    if (this.state.nega.errors.description) {
      return <div>{this.state.nega.errors.description}</div>;
    }
  }

  private renderNegaFilmError(): any {
    if (this.state.selectedNegaFilmFiles.length == 0) {
      return <div>Upload a photo!</div>;
    }
  }

  private renderUploadFilmsButton() {
    return (
      <div>
        <input
          name="films[]"
          ref={field => (this.state.negaFilmsField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={false}
          accept="image/*"
          // Hide the button itself
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: "hidden",
            position: "absolute",
            zIndex: -1
          }}
          id="nega_films"
          onChange={e => this.handleNegaFilmsChange()}
        />
        <label className="btn btn-success" htmlFor="nega_films">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp; Upload One File
        </label>
      </div>
    );
  }

  private renderSelectedNegaFilmFiles() {
    const fileDOMs = this.state.selectedNegaFilmFiles.map(
      (el: any, index: any) => {
        return (
          <div key={index}>
            <div>
              <img width={150} src={el.id ? el.url : URL.createObjectURL(el)} />
            </div>
            <div>{el.name}</div>
          </div>
        );
      }
    );

    return <ul className="selected-films">{fileDOMs}</ul>;
  }

  private renderUploadingProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }
    return (
      <div>
        <ProgressBar type="circular" />
      </div>
    );
  }

  private handleNegaFilmsChange() {
    const selectedFiles = this.state.negaFilmsField.files;
    const { selectedNegaFilmFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedNegaFilmFiles.push(selectedFiles.item(i));
    }
    this.setState({ selectedNegaFilmFiles: selectedNegaFilmFiles });
  }

  private buildFormData() {
    let formData = new FormData();
    formData.append("nega[title]", this.state.nega.title);
    formData.append("nega[description]", this.state.nega.description);

    let { selectedNegaFilmFiles } = this.state;
    for (let i = 0; i < selectedNegaFilmFiles.length; i++) {
      let file = selectedNegaFilmFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`nega[films_attributes][${i}][id]`, file.id);
          formData.append(`nega[films_attributes][${i}][_destroy]`, "1");
        }
      } else {
        formData.append(`nega[films_attributes][${i}][photo]`, file, file.name);
      }
    }
    return formData;
  }

  private submitForm() {
    const submitMethod = this.state.nega.id ? "patch" : "post";
    const url = this.state.nega.id
      ? `/negas/${this.state.nega.id}.json`
      : "/negas.json";

    axiosClient[submitMethod](url, this.buildFormData())
      .then((response: any) => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push("/");
      })
      .catch((error: any) => {
        const { nega } = this.state;
        nega.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          nega: nega
        });
      });
  }

  private handleFormSubmit() {
    const { nega } = this.state;
    nega.errors = {};

    if (this.state.selectedNegaFilmFiles.length !== 0) {
      this.setState(
        {
          isSubmittingForm: true,
          nega: nega
        },
        () => {
          this.submitForm();
        }
      );
    }
  }

  private handleCancel() {
    this.props.history.push("/negas");
  }
}
