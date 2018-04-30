import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], deviceId: '' });

const mapToProps = ({ results, deviceId }) => ({ results, deviceId });

const actions = ({ setState }) => ({
    getResults(state, value) {
        return axios.post(
//            'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCTVMHDJUxUdkd9_0NhrKGC-86PObf9QYM',
//            {
//                "requests":[{
//                    "image":{ "content": value.replace("data:image/jpeg;base64,", "") },
//                    "features":[ { "type":"LOGO_DETECTION", "maxResults": 1 } ]
//                }]
//            }
            'http://workshop-ava.azurewebsites.net/api/Camera/RecognizeImage', value,
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        )
        .then(response => {
            var data = JSON.parse(response.data);
            var product = {
                name: data.Products[0].Name,
                description: data.Products[0].Products[0].FullDescription,
                price: data.Products[0].Products[0].Price
            };
            var results = state.results.concat([{ image: value, product: product  }]);
            return { results: results, deviceId: state.deviceId }
        })
        .catch(error => {
            debugger;
            var results = state.results.concat([{ image: value, product: null }]);
            return { results: results, deviceId: state.deviceId }
        })
    },
    setDeviceId(state, value) {
        return { results: state.results, deviceId: value }
    }
});

export { store, mapToProps, actions };
