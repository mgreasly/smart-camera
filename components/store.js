import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], deviceId: '', specials: [], loading: false });

const mapToProps = ({ results, deviceId, specials }) => ({ results, deviceId, specials });

const actions = ({ setState }) => ({
    getResults(state, value) {
        setState({ loading: true });
        console.log("loading...");
        return axios.post(
            'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCTVMHDJUxUdkd9_0NhrKGC-86PObf9QYM',
            {
                "requests":[{
                    "image":{ "content": value.replace("data:image/jpeg;base64,", "") },
                    "features":[ { "type":"LOGO_DETECTION", "maxResults": 1 } ]
                }]
            }
        )
        .then(response => {
            var product = {
                name: response.data.responses[0].logoAnnotations[0].description,
                description: '',
                price: ''
            };
            var results = state.results.concat([{ image: value, product: product }]);
            console.log("done...");
            return { results: results, deviceId: state.deviceId };
        })
        .catch(error => {
            var results = state.results.concat([{
                image: value,
                product: { name: 'unidentified', description: '', price: '' }
            }]);
            console.log("done...");
            return { results: results, deviceId: state.deviceId };
        })
    },
    setDeviceId(state, value) { return { results: state.results, deviceId: value } },
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
