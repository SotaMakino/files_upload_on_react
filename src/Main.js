import React, { Component } from 'react';
import axiosClient from './axiosClient';
import Gallery from "react-photo-gallery";

class Main extends Component {

  state = { 
  	negas: []
  };

  componentWillMount() {
    axiosClient.get('/negas.json').then(response => {
      this.setState({ negas: response.data });
    });
  }

  render() {
    return (
      <div className="NotFound">
       <Gallery photos={defaultPhotos} />
       <div>
       {this.renderAllNegaFilmFiles()}
       </div>
      </div>
    );
  }

  renderAllNegaFilmFiles() {
  	return this.state.negas.map(nega => {
  	  return(
  		  <img 
  		    src={nega.film_photos[0].url }
            width={400}
            height={400}
            margin={100}
  		  />
  	   );
  	});
   }
}

const defaultPhotos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3
  }
];

export default Main
;