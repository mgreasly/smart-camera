import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], deviceId: '' });

const mapToProps = ({ results, deviceId }) => ({ results, deviceId });

const actions = ({ setState }) => ({
    getResults(state, value) {
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
            var results = state.results.concat([{
                image: value,
                logo: response.data.responses[0].logoAnnotations
            }])
            return { results: results, deviceId: state.deviceId }
        })
        .catch(error => {
            return { results: state.results, deviceId: state.deviceId }
        })
    },
    setDeviceId(state, value) {
        return { results: state.results, deviceId: value }
    }
});

export { store, mapToProps, actions };
