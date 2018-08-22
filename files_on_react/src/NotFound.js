import React, { Component } from 'react';
import axiosClient from './axiosClient';

class NotFound extends Component {

  state = { negas: [] };

  componentWillMount() {
    axiosClient.get('/negas.json').then(response => {
      this.setState({ negas: response.data });
    });
  }

  render() {
    return (
      <div className="NotFound">
       {this.renderAllNegaFilmFiles()}
      </div>
    );
  }

  renderAllNegaFilmFiles() {
    let fileDOMs = this.state.negas.map((el, index) => {

      return (
        <li key={index}>
         {console.log(el.film_photos[0].url)}
          <div >
            <img
              width={150}
              src={el.film_photos[0].url}
              style={{ alignSelf: 'center' }}
              alt="description of image"
            />
          </div>
          <div >
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul>
        {fileDOMs}
      </ul>
    );
  }

}

export default NotFound;