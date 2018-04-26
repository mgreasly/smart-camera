import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ image: null, result: null });

const mapToProps = ({ image, result }) => ({ image, result });

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
        .then(response => ({ 
            image: value, 
            result: response.data.responses[0].logoAnnotations,
        }))
        .catch(error => ({ 
            image: value, 
            result: null
        }))
    }
});

export { store, mapToProps, actions };
