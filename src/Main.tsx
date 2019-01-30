import * as React from 'react';
import axiosClient from './axiosClient';
import Button from 'react-toolbox/lib/button/Button';
import './Main.css';
import { History } from 'history';

interface IProps {
  history: History;
  match: any;
}

interface IState {
  negas: any;
}

export default class Main extends React.Component <IProps, IState> {

  state: Readonly<IState> = { 
    negas: []
  };

  private handleNew(){
    this.props.history.push('/negas/new');
  }

  componentDidMount() {
    axiosClient.get('/negas.json').then((response: any) => {
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

  private renderAllNegaFilmFiles() {
  	return this.state.negas.map((nega: any) => {
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