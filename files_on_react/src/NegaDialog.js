import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

class NegaDialog extends Component {
  
  state = { selectedNegaFilmFiles: [] }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
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
        title='Edit Nega'
        active={true}
        actions={[
          { label: 'Cancel', onClick: this.handleClickCancel },
          { label: 'Save', onClick: this.handleClickSave }
        ]}
        onOverlayClick={this.handleClickCancel}
        onEscKeyDown={this.handleClickCancel}
      >
        <Input
          type='text'
          name='title'
          label='Title'
          value={title}
          required={true}
          multiline={true}
          onChange={this.handleChange.bind(null, 'title')}
        />
        <Input
          type='text'
          label='description'
          name='description'
          value={description}
          required={true}
          multiline={true}
          onChange={this.handleChange.bind(null, 'description')}
        />
        {this.renderUploadFilmsButton()}
      </Dialog>
    )
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedNegaFilmFiles.filter(el => {
      return el._destroy !== true;
    }).length;
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

}

export default NegaDialog;