import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Card from 'preact-material-components-mgr/Card';
import 'preact-material-components-mgr/Card/style.css';
import 'preact-material-components-mgr/Button/style.css';

class ListPage extends Component {
	render() {
        return (
            <div class="results">
                {this.props.results && this.props.results.map(function(result, index) {
                    var text = "not recognised"
                    if (result.logo && result.logo[0] && result.logo[0].description) text = result.logo[0].description
                    return (
                        <Card>
                            <div class="card-media"><img src={result.image} /></div>
                            <div class="card-text">
                                <div>
                                    <h1>{text}</h1>
                                    {text != "not recognised" && <p>product details</p>}
                                </div>
                                <div class="card-actions">
                                    {text != "not recognised" && <Card.ActionButton class="card-action-button">Buy this</Card.ActionButton>}
                                </div>
                            </div>
                      </Card>                        
                    )
                })}
            </div>
		);
   	}
};

export default connect(mapToProps, actions)(ListPage);
