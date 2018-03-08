import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button } from '../components/common';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import LocationDetail from '../components/LocationDetail';
import Logout from '../components/Logout';
import Map from '../components/Map';
import SplashScreen from '../components/SplashScreen';
import {logout} from '../actions' 

const RouterComponent = StackNavigator({
    // SplashScreen: { screen: SplashScreen },
    Home: { screen: LoginForm },
    Signup: { screen: SignupForm },
    Map: {
        screen: Map,
        navigationOptions: ({ navigation }) => ({
            title: 'Tourist Guide',
            headerLeft: null,
            headerRight: <Logout navigation={navigation} />
        })
    },
    DetailComponent: { screen: LocationDetail },
    // TabNavigator: {
    //     screen: DetailComponent,
    //     navigationOptions: ({ navigation }) => ({
    //         title: 'Patient Tracker',
    //         headerLeft: null,
    //         headerRight: <Logout navigation={navigation} />
    //     })
    // },
});


export default RouterComponent;