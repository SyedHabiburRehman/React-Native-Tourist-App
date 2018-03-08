import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
//import LoginForm from './components/LoginForm';
import RouterComponent from './src/screens/Router';
import Main from './src/main';

class App extends Component {
    componentWillMount() {

    };

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Main />
        );
    }
}

export default App;