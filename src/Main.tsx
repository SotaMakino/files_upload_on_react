import * as React from 'react';
import axiosClient from './axiosClient';
import Button from 'react-toolbox/lib/button/Button';
import './Main.css';
import { History } from 'history';

interface IProps {
  history: History;
  match: any;
}

export default class Main extends React.Component <IProps> {

  state = { 
    negas: []
  };

  handleNew(){
    this.props.history.push('/negas/new');
  }

  componentDidMount() {
    axiosClient.get('/negas.json').then(response => {
      this.setState({ negas: response.data });
    });
  }

  public render() {
    return (
      <div>
          <div>
          {this.renderAllNegaFilmFiles()}
          </div>
        <div className='Main-button'>
          <Button
            icon='add'
            floating
            accent
            onClick={this.handleNew.bind(this)}
          />
        </div>
      </div>
    );
  }

  renderAllNegaFilmFiles() {
  	return this.state.negas.map(nega => {
      return(
        <img
          src={nega.film_photos[0].url.replace(/\/\/negabook-server.herokuapp.com/g, '')}
          width={400}
          height={400}
        />
       );
    });
  }
}