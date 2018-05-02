import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], loadingResults: false, deviceId: '', specials: [], loadingSpecials: false });

const mapToProps = ({ results, loadingResults, deviceId, specials, loadingSpecials }) => ({ results, loadingResults, deviceId, specials, loadingSpecials });

const actions = ({ setState }) => ({
    getResults(state, value) {
        setState({ loadingResults: true });
        return axios.post(
            'http://workshop-ava.azurewebsites.net/api/Camera/RecognizeImage', 
            value
        )
        .then(response => {
            var data = JSON.parse(response.data);
            var product = data.Products[0];
            var result = {
                name: product.Name,
                description: product.Products[0].FullDescription,
                price: product.Products[0].Price
            };
            var results = [{ image: value, product: result }].concat(state.results);
            return { results: results, loadingResults: false, deviceId: state.deviceId, specials: state.specials, loadingSpecials: state.loadingSpecials };
        })
        .catch(error => {
            var results = [{ image: value, product: null }].concat(state.results);
            return { results: results, loadingResults: false, deviceId: state.deviceId, specials: state.specials, loadingSpecials: state.loadingSpecials };
        })
    },
    setDeviceId(state, value) { return { results: state.results, deviceId: value } },
    getSpecials(state) {
        setState({ specials: [], loadingSpecials: true });
        return axios.get('https://testavagoapi.azurewebsites.net/api/deals')
        .then(response => {
            var specials = response.data.map(function(item, index) {
                return {
                    name: item.name,
                    description: "",
                    price: item.originalPrice,
                    discountPrice: item.discountPrice,
                    image: item.imageUrl
                };
            });
            return { results: state.results, loadingResults: state.loadingResults, deviceId: state.deviceId, specials: specials, loadingSpecials: false };
        })
        .catch(error => {
            return { results: state.results, loadingResults: state.loadingResults, deviceId: state.deviceId, specials: [], loadingSpecials: false };
        })
    }  
});

export { store, mapToProps, actions };
