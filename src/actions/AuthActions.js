import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import {
    USER_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT
} from './types';



export const userChanged = ({ prop, value }) => {
    return {
        type: USER_CHANGED,
        payload: { prop, value }
    }
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export const passwordChange = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
}

export const loginUser = ({ email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                getTourist(user.uid, email, password)
                console.log(user + '----------------' + navigation.navigate)
                dispatch(loginUserSuccess(user));
                navigation.navigate('Map');
                console.log('++++++++++++++++++++++');
            })
            .catch(() => {
                console.log(error);
                loginUserFail(dispatch)
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL,
    });
};

const loginUserSuccess = (user) => {

    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    };

};

const getTourist = (uid, email, password) => {
    return (dispatch) => {
        firebase.database().ref(`/tourists/${uid}/account`)
        .on('value', (data) => {
            let touristsData = data.val();
            // let array = [];
            // for (var data in userData) {
                //     array.push(userData[data])
                // }
                // console.log(array)
                var sortData = {}
    
                // array.map((doc, i) => {
                    // console.log(email, touristsData.email)
                    // if (doc.email === email) {
                        // return (
                            sortData = {
                                _id: touristsData._id,
                                email: touristsData.email,
                                pass: touristsData.password,
                                name: touristsData.name,
                            }
                        // )
                    // }
                // })

                console.log(sortData);
                AsyncStorage.setItem('touristsapp', JSON.stringify(sortData))
                console.log(array)
        });
    }
}

export const SignupUser = ({ name, email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: SIGNUP_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                _id = user.uid;
                firebase.database().ref(`/tourists/${_id}/account`).set({ _id, name, email, password });

                dispatch(signupUserSuccess(user));
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
                signupUserFail(dispatch);
            });
    };
};

const signupUserSuccess = (user) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };

};

const signupUserFail = (dispatch) => {
    dispatch({
        type: SIGNUP_USER_FAIL,
    });
};


export const logout = (props) => {
    console.log(props)
    return (dispatch) => {
        AsyncStorage.removeItem('touristApp')
        // dispatch({ type: LOGOUT });
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
        });
        props.navigation.dispatch(resetAction);

    };
};