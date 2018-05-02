import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], deviceId: '', specials: [] });

const mapToProps = ({ results, deviceId, specials }) => ({ results, deviceId, specials });

const actions = ({ setState }) => ({
    getResults(state, value) {
        return axios.post(
            'http://workshop-ava.azurewebsites.net/api/Camera/RecognizeImage', 
            value,
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        )
        .then(response => {
            var product = {
                name: response.data.responses[0].logoAnnotations[0].description,
                description: '',
                price: ''
            };
            var results = state.results.concat([{ image: value, product: product }]);
            return { results: results };
        })
        .catch(error => {
            var results = state.results.concat([{
                image: value,
                product: { name: 'unidentified', description: '', price: '' }
            }]);
            return { results: results };
        })
    },
    setDeviceId(state, value) { return { deviceId: value } },
    getSpecials() {
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
            return { specials: specials };
        })
        .catch(error => {
            return { specials: [] };
        })
    }  
});

export { store, mapToProps, actions };


import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ image: null, result: null });

const mapToProps = ({ image, result }) => ({ image, result });

const actions = ({ setState }) => ({
    getResults(state, value) {
        return axios.post(
            'http://workshop-ava.azurewebsites.net/api/Camera/RecognizeImage', 
            value,
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        )
        .then(response => {
            debugger;
            var data = JSON.parse(response.data);
            var product = {
                name: data.Products[0].Name,
                description: data.Products[0].Products[0].FullDescription,
                price: data.Products[0].Products[0].Price
            };
            return { image: value, result: result };
        })
        .catch(error => {
            return { image: value, result: null };
        })
    }
