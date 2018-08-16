import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';

const photos = [
  // { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
  // { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
  // { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
  // { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
  // { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
  // { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
  // { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
  // { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
  // { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
];


class Welcome extends Component {
  render(){
    return(
    	<div className="Welcome">
      <Gallery photos={photos} />
            <Link to="/negas">Index</Link>
        </div>
      );
  }
 }

export default Welcome;