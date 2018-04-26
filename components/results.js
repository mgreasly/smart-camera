import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';

class Results extends Component {
	render() {
        return (
            <div id="results">
                <h1>Results...</h1>
                <img width="300" src={this.props.image} />
                {this.props.result && this.props.result[0].description}
            </div>
		);
   	}
};

export default connect(mapToProps, actions)(Results);
