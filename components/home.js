import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Webcam from 'react-webcam';
import MediaDevices from './mediadevices';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { deviceId: '' }
  }

  capture = () => { 
    const image = this.webcam.getScreenshot(); 
    this.props.getResults(image);
    route("/results");
  }

  handleDeviceChange = (event) => { 
    this.setState({ deviceId: event.currentTarget.id }) 
  }

  render() {    
    return (
      <div id="home">
        <h1>Take a picture to analyse...</h1>
        <MediaDevices kind="videoinput" selected={this.state.deviceId} handleDeviceChange={this.handleDeviceChange} />
        {this.state.deviceId && <Webcam key={this.state.deviceId} audioSource="" videoSource={this.state.deviceId} audio={false} ref={webcam => { this.webcam = webcam; }} screenshotFormat="image/jpeg" />}
        <Button raised dense onclick={this.capture}>Take picture</Button>
      </div>
    );
  }
}

export default connect(mapToProps, actions)(Home);
