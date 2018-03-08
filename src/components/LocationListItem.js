import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import { getLocationDetail } from '../actions';
class LocationListItem extends Component {

    render() {
        // console.log('33333333333333333333333333333333333333333333333333333333333333333333333333333333333',this.props.navigation)
        const { locationsList } = this.props;
        const { navigation } = this.props.navigation;
        const { containerStyle, titleStyle } = styles

        return (
            <TouchableOpacity onPress={() => this.props.getLocationDetail(locationsList.place_id, navigation, this.props.currentPosition)}>
                <View>
                    <CardSection>
                        <View style={styles.containerStyle}>
                            <Text style={styles.titleStyle}>
                                {locationsList.name}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 15,
    },
    titleStyle: {
        color: 'black',
        fontSize: 18,
        height: 40
    },
};

export default connect(null, { getLocationDetail })(LocationListItem);