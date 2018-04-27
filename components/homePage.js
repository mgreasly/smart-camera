import { Component } from 'preact';
import { route } from 'preact-router';
import Webcam from 'react-webcam';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';

export default class HomePage extends Component {
    capture = () => { 
        const imageSrc = this.webcam.getScreenshot(); 
    } 
    render() {
        return (
            <div id="home">
                <h1>AvaGo Smart Camera</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        );
    }
}
