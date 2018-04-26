import { Component } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Home from './home';
import Results from './results';

export default class App extends Component {
    render() {
        return (
            <div id="app">
                <Header />
                <Router>
                    <Home path="/" />
                    <Results path="/results" />
                </Router>
            </div>
        );
    }
}
