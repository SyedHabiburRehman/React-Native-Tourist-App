import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
//import LoginForm from './components/LoginForm';
import RouterComponent from './screens/Router';

class Main extends Component {
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyDQHgV4FF0rp6pLSXdLkLwkWgcv0N-nmsA",
            authDomain: "tourist-guide-fcf01.firebaseapp.com",
            databaseURL: "https://tourist-guide-fcf01.firebaseio.com",
            projectId: "tourist-guide-fcf01",
            storageBucket: "",
            messagingSenderId: "1083965969473"
          };
          firebase.initializeApp(config);        
    };

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        );
    }
}

export default Main;