import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import axios from 'axios';

class Welcome extends Component {

  state = { selectedFile: null }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile:event.target.files[0]
    })
  }

  fileUploadHandler = () => {
     const fd = new FormData();
     fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
     axios.post('http://localhost:3000', fd)
     .then(res => {
      console.log(res);
     });
  }

  render(){
    return(
    	<div className="Welcome">
        <input type='file' onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
      );
    }
 }

export default Welcome;