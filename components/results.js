import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';

class Results extends Component {
	render() {
        return (
            <div id="results">
                <h1>Results...</h1>
                {this.props.results && this.props.results.map(function(result, index) {
                    var text = "not recognised"
                    if (result.logo && result.logo[0] && result.logo[0].description) text = result.logo[0].description
                    return <div><img src={result.image} /> {text}</div>
                })}
            </div>
		);
   	}
};

export default connect(mapToProps, actions)(Results);
