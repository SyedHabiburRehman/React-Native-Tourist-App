import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { userChanged, emailChanged, passwordChange, SignupUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const mapStateToProps = ({ auth }) => {
    const { name, email, password, error, loading, isRegistered } = auth;
    console.log(name, email, password, loading, isRegistered);
    return {
        name,
        email,
        password,
        error,
        loading,
        isRegistered
    };
};

class SignupForm extends Component {

    static navigationOptions = {
        title: 'Signup',
    };

    onEmailChange(text) {
        this.props.emailChanged(text);
    };
    onPasswordChange(password) {
        this.props.passwordChange(password);
    };
    onButtonPress() {
        console.log(this.props)
        const { name, email, password, navigation } = this.props;

        this.props.SignupUser({ name, email, password, navigation });

    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Signup
            </Button>
        );
    };
    // navigate() {
    //     if (this.props.isLoggedin) {
    //         this.props.navigation.navigate('Patient');
    //     }
    //     else null
    // }

    render() {
        return (
            <View style={{ marginTop: 100 }}>
                <Card>
                    <CardSection>
                        <Input
                            label="Full Name"
                            placeholder="John"
                            keyboardType='default'
                            onChangeText={(value) => this.props.userChanged({ prop: 'name', value })}
                            value={this.props.name}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            keyboardType='email-address'
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="Password"
                            keyboardType='default'
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>
                    <CardSection>
                        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                    </CardSection>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                    
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
    
};

export default connect(mapStateToProps, { userChanged, emailChanged, passwordChange, SignupUser })(SignupForm);