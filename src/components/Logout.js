import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { logout } from '../actions';

class Logout extends Component {
    // resetNavigation = (targetRoute) => {
    //     console.log(this.props);
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({ routeName: targetRoute }),
    //         ],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // };

    render() {
        console.log("LOGOUT COMPONENT", this.props)
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log("props", this.props)
                    this.props.logout(this.props)
                }}
            >
                <Text style={{ color: 'blue' }}>Logout</Text>
            </TouchableOpacity >
        );
    }
};

export default connect(null, { logout })(Logout);