import React, { Component } from 'react';
import Header from './Header';
import Button from 'react-toolbox/lib/button/Button';
import Negas from './Negas.js';
import NegaDialog from './NegaDialog';
import Welcome from './Welcome';
import * as axios from './axiosClient';
import * as actions from './actions';
import './Routes.css';

class Routes extends Component {

  constructor() {
    super();
    this.state = {
     info: null,
     negas: null,
     selectedNegaIndex: null,
     negaInDialog: null
   };

    this.handleCancelNegaDialog = this.handleCancelNegaDialog.bind(this);
    this.handleCreateNega = this.handleCreateNega.bind(this);
    this.handleEditNega = this.handleEditNega.bind(this);
    this.handleChangeNega = this.handleChangeNega.bind(this);
    this.handleSaveNega = this.handleSaveNega.bind(this);
    this.handleDeleteNega = this.handleDeleteNega.bind(this);
  }

  handleCancelNegaDialog() {
    this.setState({ negaInDialog: null });
  }

  handleCreateNega() {
    const nega = {
      title: '',
      description: ''
    };
    this.setState({ negaInDialog: nega });
  }

  handleEditNega(nega) {
    this.setState({ negaInDialog: nega });
  }

  handleChangeNega(field, value) {
    this.setState(prevState => {
      const { negaInDialog } = prevState;
      const newNegaInDialog = Object.assign(
        {},
        negaInDialog,
        { [field]: value }
      );
      return { negaInDialog: newNegaInDialog };
    });
  }

  handleSaveNega(nega) {
    if (nega.id) {
      this.updateNega(nega);
    } else {
      this.createNega(nega);
    }
  }

  handleDeleteNega(nega) {
    this.deleteNega(nega);
  }

  componentDidMount() {
    this.fetchUserDetails();
    this.fetchNegas();
  }

  render() {
    const {
      info,
      negas,
      selectedNegaIndex,
      negaInDialog
    } = this.state;

    return(
      <div className='Routes'>
        <Header
          info={info}
        />
        <div className='Routes-content'>
          <Negas
            negas={negas}
            selectedNegaIndex={selectedNegaIndex}
            onClickEdit={this.handleEditNega}
            onClickDelete={this.handleDeleteNega}
          />
          <div className='Routes-button'>
            <Button
              icon='add'
              floating
              accent
              onClick={this.handleCreateNega}
            />
          </div>
        </div>
        <NegaDialog
          nega={negaInDialog}
          onChange={this.handleChangeNega}
          onSave={this.handleSaveNega}
          onCancel={this.handleCancelNegaDialog}
        />
        <Welcome />
      </div>
    );
  }

  fetchUserDetails() {
    axios.fetchUserDetails({ token: this.props.token })
      .then(info => {
        this.setState({ info })
      });
  }

  fetchNegas() {
    axios.fetchNegas({ token: this.props.token })
      .then(negas => {
        this.setState({ negas, selectedNegaIndex: 0 })
      });
  }

  createNega(nega) {
    axios.createNega({ token: this.props.token, nega })
      .then(nega => {
        this.setState(actions.createNega.bind(null, nega));
      });
  }

  updateNega(nega) {
    axios.updateNega({ token: this.props.token, nega })
      .then(nega => {
        this.setState(actions.updateNega.bind(null, nega));
      });
  }

  deleteNega(nega) {
    axios.deleteNega({ token: this.props.token, nega })
      .then(() => {
        this.setState(actions.deleteNega.bind(null, nega));
      });
  }

}

export default Routes;