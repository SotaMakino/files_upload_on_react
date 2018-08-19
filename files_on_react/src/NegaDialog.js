import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

class NegaDialog extends Component {
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
        title='Edit nega'
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
      </Dialog>
    )
  }
}

export default NegaDialog;