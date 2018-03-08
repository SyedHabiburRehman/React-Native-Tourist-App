import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Card, CardSection, Button } from './common';
import PictureSlides from './PictureSlides';
import { getDirections } from '../actions';
// import NoImage from '../images/1.png';

const mapStateToProps = ({ mapReducer }) => {
    const { locationDetail, coords } = mapReducer;
    // console.log('-------------------', locationDetail)
    return {
        locationDetail,
        coords
    };
};

class LocationDetail extends Component {
    static navigationOptions = {
        title: 'Location Detail',
    };
    constructor(props) {
        super();
        this.state = {
            coords: [],
        };
    };

    componentWillUnmount() {
        this.setState({ coords: [] });
    };
    componentWillReceiveProps(nextProps) {

        this.setState({ coords: nextProps.coords })
    }
    renderDetails() {
        const currentPostion = this.props.navigation.state.params;

        return (
            <View>
                {
                    this.props.locationDetail.hasOwnProperty("photos") ?
                        <View>
                            <PictureSlides Pictures={this.props.locationDetail.photos} />
                        </View>
                        :
                        /* null */
                        <View>
                            <Image style={styles.imageStyle} source={require('../images/1.png')} />
                        </View>
                }

                <CardSection >
                    <View style={styles.nestedContainerStyle}>
                        <Ionicons style={styles.iconStyle} name="md-checkmark-circle" size={32} color="blue" />
                        <Text style={styles.textStyle}>
                            {this.props.locationDetail.name}
                        </Text>
                    </View>
                </CardSection >

                <CardSection>
                    <View style={styles.nestedContainerStyle}>
                        <Entypo style={styles.iconStyle} name="address" size={32} color="blue" />
                        <Text style={styles.textStyle}>
                            {this.props.locationDetail.formatted_address}
                        </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={styles.nestedContainerStyle}>
                        <FontAwesome style={styles.iconStyle} name="phone-square" size={32} color="blue" />
                        <Text style={styles.textStyle}>
                            {this.props.locationDetail.formatted_phone_number}
                        </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={styles.nestedContainerStyle}>
                        <Ionicons style={styles.iconStyle} name="md-checkmark-circle" size={32} color="blue" />
                        {
                            this.props.locationDetail.hasOwnProperty("website") ?
                                <Text style={styles.textStyle}>{this.props.locationDetail.website}</Text>
                                :
                                <Text style={styles.textStyle}>Suggest an edit</Text>
                        }
                    </View>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.props.getDirections(currentPostion, this.props.locationDetail.geometry.location)}>
                        Get Direction
                    </Button>
                </CardSection>

                <View style={styles.container}>
                    <MapView
                        mapType="hybrid"
                        provider={PROVIDER_GOOGLE}
                        region={currentPostion}
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        loadingEnabled={true}
                    >
                        <MapView.Polyline
                            coordinates={this.state.coords}
                            strokeWidth={4}
                            strokeColor="blue" />
                    </MapView>
                </View>

            </View>
        );
    }

    render() {
        // console.log('CURRENT', this.props.navigation.state.params)
        const currentPostion = this.props.navigation.state.params;

        return (
            // <View style={styles.containerStyle}>
            <ScrollView
                bounces={false}
            >
                {this.renderDetails()}
            </ScrollView>




            // </View>

        );
    };
}
const styles = {
    container: {
        flex: 1,
        // marginTop: 5,
        height: 300,
        // ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        height: 300,
        // width: Dimensions.get('window').width,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: 'black'
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',

        // alignItems: 'space-around'
    },
    nestedContainerStyle: {
        flexDirection: 'row',
        flex: 1
    },

    iconStyle: {
        // flex: 1,
        paddingLeft: 10
    },
    textStyle: {
        // flex: 2,
        paddingLeft: 10,

    },
    imageStyle: {
        height: 200,
        flex: 1,
        // justifyContent: 'space-around',
        width: Dimensions.get('window').width,

    },
}


export default connect(mapStateToProps, { getDirections })(LocationDetail);