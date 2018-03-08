import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Asset, AppLoading } from 'expo';
import LoginForm from './LoginForm';
import firebase from 'firebase';

class SplashScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            isReady: false,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Map');
                // this.setState({ isReady: true })
            } else {
                this.setState({ isReady: true })
                // this.props.navigation.navigate('Home');
            }
        });

    }
    // async _cacheResourcesAsync() {
    // const images = [
    // Asset.fromModule(require('../images/1.png')).localUri,
    // ];

    // for (let image of images) {
    //     await Asset.fromModule(image).localUri;
    // }
    // }

    render() {
        return (
            (!this.state.isReady) ?
                <View style={{ flex: 1 }}>
                    <Image style={{ flex: 1, alignItems: 'center' }} source={require('../images/1.png')} />
                </View>
                :
                <LoginForm />
        );
    };
};
export default SplashScreen;