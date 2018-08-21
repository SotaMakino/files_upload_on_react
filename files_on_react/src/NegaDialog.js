import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import './NegaDialog.css';
import axiosClient from './axiosClient';
import './Nega/Form/index.css';

class NegaDialog extends Component {
  
  state = {
    selectedNegaFilmFiles: [],
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    nega: {
      id: '',
      title: '',
      description: '',
      errors: {}
    }
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleChange(field, value) {
    this.props.onChange(field, value);
  }

  handleClickSave() {
    this.props.onSave(this.props.nega);
  }

  handleClickCancel() {
    this.props.onCancel();
  }

  render() {
    if (this.props.nega == null) {
      return null;
    }

    const { nega } = this.props;
    const { title, description } = nega;

    return (
      <Dialog
        title='New Nega'
        active={true}
        actions={[
          { label: 'Cancel', onClick: this.handleClickCancel },
          { label: 'Save', onClick: this.handleClickSave }
        ]}
        onOverlayClick={this.handleClickCancel}
        onEscKeyDown={this.handleClickCancel}
      >

          <div className="form-group">
            <label>title</label>
            <input
              type="text"
              onChange={e => this.handleNegaTitleChange(e)}
              value={this.state.nega.title}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              onChange={e => this.handleNegaDescriptionChange(e)}
              value={this.state.nega.description}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Films</label>
            {this.renderUploadFilmsButton()}
            {this.renderSelectedNegaFilmFiles()}
          </div>
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </button>

      </Dialog>
    )
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedNegaFilmFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  renderUploadFilmsButton() {
    let numberOfSelectedFilms = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="films[]"
          ref={field => (this.negaFilmsField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="image/*"
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
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="nega_films">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedFilms === 0
            ? 'Upload Files'
            : `${numberOfSelectedFilms} file${numberOfSelectedFilms !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  renderSelectedNegaFilmFiles() {
    let fileDOMs = this.state.selectedNegaFilmFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <li key={index}>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedNegaFilmFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-films">
        {fileDOMs}
      </ul>
    );
  }

  handleNegaFilmsChange() {
    let selectedFiles = this.negaFilmsField.files;
    let { selectedNegaFilmFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedNegaFilmFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedNegaFilmFiles: selectedNegaFilmFiles
      },
      () => {
        this.negaFilmsField.value = null;
      }
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
      [submitMethod](url, this.buildFormData(), {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          this.setState({
            submitFormProgress: percentage
          });
        }
      })
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/negas');
      })
      .catch(error => {
        let { nega } = this.state;
        nega.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          nega: nega
        });
      });
  }

  handleFormSubmit() {
    let { nega } = this.state;
    nega.errors = {};
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

export default NegaDialog;