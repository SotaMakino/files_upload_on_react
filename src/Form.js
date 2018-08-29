import React, { Component } from 'react';
import axiosClient from './axiosClient';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import './Form.css';

class NegaForm extends Component {
  state = {
      selectedNegaFilmFiles: [],
      nega: {
        id: this.props.match.params.id,
        title: '',
        description: '',
        errors: {}
      },
      isSubmittingForm: false,
      didFormSubmissionComplete: false
    };

  // for Edit and Update
  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient.get(`/negas/${this.props.match.params.id}`).then(response => {
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

  render() {
    return (
        <Dialog
          title='New Nega'
          active={true}
        >
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
            <textarea
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
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </Button>
          &nbsp;
          <Button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </Button>
          <br/>
        </Dialog>
    );
  }

  handleNegaTitleChange(e) {
    let { nega } = this.state;
    nega.title = e.target.value;
    this.setState({ nega: nega });
  }

  handleNegaDescriptionChange(e) {
    let { nega } = this.state;
    nega.description = e.target.value;
    this.setState({ nega: nega });
  }

  renderNegaTitleError() {
    if (this.state.nega.errors.title) {
      return (
        <div>
          {this.state.nega.errors.title}
        </div>
      );
    }
  }

  renderNegaDescriptionError() {
    if (this.state.nega.errors.description) {
      return (
        <div>
          {this.state.nega.errors.description}
        </div>
      );
    }
  }

  renderNegaFilmError(){
    if (this.state.selectedNegaFilmFiles.length == 0){
      return(
        <div>
          Upload a photo!
        </div>
      );
    }
  }

  renderUploadFilmsButton() {
    return (
      <div>
        <input
          name="films[]"
          ref={field => (this.negaFilmsField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={false}
          accept="image/*"
          // Hide the button itself
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="nega_films"
          onChange={e => this.handleNegaFilmsChange(e)}
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="nega_films">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          Upload One File
        </label>
      </div>
    );
  }

  renderSelectedNegaFilmFiles() {
    let fileDOMs = this.state.selectedNegaFilmFiles.map((el, index) => {
      return (
        <div key={index}>
          <div>
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
            />
          </div>
          <div>
            {el.name}
          </div>
        </div>
      );
    });

    return (
      <ul className="selected-films">
        {fileDOMs}
      </ul>
    );
  }

  renderUploadingProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div>
        <ProgressBar type="circular" />
       </div> 
    );
  }

  handleNegaFilmsChange() {
    let selectedFiles = this.negaFilmsField.files;
    let { selectedNegaFilmFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedNegaFilmFiles.push(selectedFiles.item(i));
    }
    this.setState({selectedNegaFilmFiles: selectedNegaFilmFiles});
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('nega[title]', this.state.nega.title);
    formData.append('nega[description]', this.state.nega.description);

    let { selectedNegaFilmFiles } = this.state;
    for (let i = 0; i < selectedNegaFilmFiles.length; i++) {
      let file = selectedNegaFilmFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`nega[films_attributes][${i}][id]`, file.id);
          formData.append(`nega[films_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `nega[films_attributes][${i}][photo]`,
          file,
          file.name
        );
      }
    }
    return formData;
  }

  submitForm() {
    let submitMethod = this.state.nega.id ? 'patch' : 'post';
    let url = this.state.nega.id
      ? `/negas/${this.state.nega.id}.json`
      : '/negas.json';

    axiosClient
      [submitMethod](url, this.buildFormData()
      )
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/');
      })
      .catch(error => {
        let { nega } = this.state;
        nega.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          nega: nega
        });
      });
  }

  handleFormSubmit() {
    let { nega } = this.state;
    nega.errors = {};

    if (this.state.selectedNegaFilmFiles.length !== 0){
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

  handleCancel() {
    this.props.history.push('/negas');
  }

}

export default NegaForm;