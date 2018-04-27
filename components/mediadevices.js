import { Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

export default class MediaDevices extends Component {
    constructor(props) {
        super(props);
        this.state = { devices: [] };
    }

    componentDidMount() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => { this.setState({ devices: devices.filter((device) => (device.kind == this.props.kind ), this) }) });
    }

    render() {
        return (
            <div>
                {this.state.devices.map(function(device, index) {
                    return <Button raised dense id={device.deviceId} title={device.deviceId} onClick={this.props.handleDeviceChange}>{device.label}</Button>
                }, this)}
            </div>
        )
    }
}
