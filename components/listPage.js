import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Card from 'preact-material-components-mgr/Card';
import 'preact-material-components-mgr/Card/style.css';
import 'preact-material-components-mgr/Button/style.css';

class ListPage extends Component {
	render() {
        debugger
        return (
            <div id="results">
                {this.props.results && this.props.results.map(function(result, index) {
                    var text = "not recognised"
                    if (result.logo && result.logo[0] && result.logo[0].description) text = result.logo[0].description
                    return (
                        <Card>
                            <Card.Media className="card-media"><img width="200" src={result.image} /></Card.Media>
                            <Card.Actions>
                                {text}
                                <Card.ActionButton>Push Me</Card.ActionButton>
                            </Card.Actions>
                      </Card>                        
                    )
                })}
            </div>
		);
   	}
};

export default connect(mapToProps, actions)(ListPage);
