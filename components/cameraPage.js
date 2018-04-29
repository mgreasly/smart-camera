import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Webcam from 'react-webcam';
import MediaDevices from './mediadevices';
import Fab from 'preact-material-components-mgr/Fab';
import 'preact-material-components-mgr/Fab/style.css';

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.state = { deviceId: '' };
  }

  capture = () => {
    const image = this.webcam.getScreenshot(); 
    this.props.getResults(image);
    route("/list");
  }

  handleDeviceChange = (event) => { 
    this.setState({ deviceId: event.currentTarget.id }) 
    this.props.setDeviceId(event.currentTarget.id)
  }
  render() {
    return (
      <div class="camera-page">
        <MediaDevices kind="videoinput" selected={this.props.deviceId} handleDeviceChange={this.handleDeviceChange} />
        <div class="webcam">
          <Webcam key={this.props.deviceId} audioSource="" videoSource={this.state.deviceId} audio={false} ref={webcam => { if (webcam) this.webcam = webcam; }} screenshotFormat="image/jpeg" />
        </div>
        <div class="footer">
          <div class="camera-buttons">
            <Fab ripple={true} onclick={this.capture}><Fab.Icon>camera</Fab.Icon></Fab>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapToProps, actions)(CameraPage);