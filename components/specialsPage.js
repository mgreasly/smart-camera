import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Card from 'preact-material-components-mgr/Card';
import 'preact-material-components-mgr/Card/style.css';

const SpecialsCard = ({special}) => (
    <Card>
        <div class="card-media"><img src={special.image} /></div>
        <div class="card-text">
            <div>
                <h1>{special.name}</h1>
                <p>
                    {special.description}
                    <br/>
                    ${special.discountPrice} - reduced from ${special.price}
                </p>
            </div>
            <div class="card-actions">
                <Card.ActionButton class="card-action-button">Buy this!</Card.ActionButton>
            </div>
        </div>
    </Card> 
)

const ShadowSpecialsCard = () => (
    <Card class="shadow-card">
        <div class="card-media">&nbsp;</div>
        <div class="card-text">
            <div>
                <h1>&nbsp;</h1>
                <p>&nbsp;<br/>&nbsp;</p>
            </div>
            <div class="card-actions">&nbsp;</div>
        </div>
    </Card> 
)

class SpecialsPage extends Component {
    componentDidMount = () => { this.props.getSpecials(); }
    render() {
        return (
            <div class="specials">
                {this.props.loadingSpecials && <ShadowSpecialsCard />}
                {this.props.specials.map((special) => <SpecialsCard special={special} />)}
            </div>
        );
    }
}

export default connect(mapToProps, actions)(SpecialsPage);
