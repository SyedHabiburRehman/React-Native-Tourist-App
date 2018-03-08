import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { MapView } from 'expo';
import LocationListItem from './LocationListItem';
import { SearchBar } from 'react-native-elements'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { getNearByPlaces, getPlaceSearch } from '../actions';
import SearchComponent from './SearchComponent';
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;;


const mapStateToProps = ({ mapReducer }) => {
    const { locationsList, locationSearch } = mapReducer;
    // console.log("LOCATION LIST", locationsList);
    console.log("LOCATION SEARCH", locationSearch);
    return {
        locationsList,
        locationSearch
    }
}

class Map extends Component {
    // static navigationOptions = {
    // };
    constructor(props) {
        super();
        this.state = {
            mapLoaded: false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            style: {},
            searchBarFocus: false
        };
    }
    watchID = null;

    componentDidMount() {
        // setTimeout(() =>
        this.setState({ style: styles.map, mapLoaded: true })
        // , 1000)
    }

    componentWillMount() {
        // navigator.geolocation.getCurrentPosition(position => {
        //     console.log('WILL MOUNT ', position.coords)
        //     this.props.getNearByPlaces(position.coords.latitude, position.coords.longitude);
        //     if (position) {
        //         this.setState({
        //             region: {
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: LATITUDE_DELTA,
        //                 longitudeDelta: LONGITUDE_DELTA,
        //             }
        //         });
        //     }
        // },
        //     (error) => console.log(error.message),
        //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        // );
        this.watchID = navigator.geolocation.watchPosition(position => {
            console.log("+++++++++", position.coords);
            // this.props.getNearByPlaces(position.coords.latitude, position.coords.longitude);
            // this.setState({
            let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            // });
            this.onRegionChangeComplete(region)
        });
    }

    componentWillUnmount() {
        console.log("unmount")
        navigator.geolocation.clearWatch(this.watchId);
    };

    componentWillReceiveProps(nextProps) {
        // console.log('NEXT PROPS', nextProps.locationsList)
        // if (nextProps.locationsList !== this.props.locationsList) {
        this.createDataSource(nextProps);
        // }
    };

    createDataSource({ locationsList }) {
        // console.log('DATASOURCE ', locationsList)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(locationsList);
    };

    onRegionChangeComplete(region) {
        console.log('ON REGION CHANGE COMPLELTE', region)
        this.props.getNearByPlaces(region.latitude, region.longitude);

        // if (this.props.locationsList.length > 0) {
        // this.createDataSource(this.props);
        // }
        this.setState({ region });
    }
    searchText(text) {
        if (text.length <= 0) {
            this.setState({ searchBarFocus: false })
        }
        this.props.getLocationSearch(text);

    }
    render() {
        if (!this.state.mapLoaded) {
            return (
                <Spinner size="large" />
            );
        }

        return (
            <View style={{flex:1}}>
                <SearchBar
                    lightTheme
                    onFocus={() => console.log('ON FOCUS')}
                    /* onFocus={() =>{
                        this.setState({searchBarFocus : true}) 
                        this.props.navigation.navigate('SearchComponent')}} */
                    /* ref={search => this.search.focus(this.props.navigation.navigate('SearchComponent')) = search} */
                    onChangeText={this.searchText.bind(this)}
                    placeholder='Type Here...'
                />
                
                {
                    !this.state.searchBarFocus
                        ?
                         <View style={styles.container}> 
                            <MapView
                                mapType="satellite"
                                provider={PROVIDER_GOOGLE}
                                region={this.state.region}
                                /* onRegionChangeComplete={this.onRegionChangeComplete.bind(this)} */
                                style={this.state.style}
                                showsUserLocation={true}
                                followsUserLocation={true}
                                showsMyLocationButton={true}
                                loadingEnabled={true}
                            >
                                {
                                    this.props.locationsList.map((marker, index) => {
                                        console.log('MARKER', marker.geometry.location.lat, marker.geometry.location.lng);
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: marker.geometry.location.lat,
                                                longitude: marker.geometry.location.lng
                                            }}
                                            key={index}
                                        />
                                    })

                                }
                            </MapView>

                            {
                                this.props.locationsList.length > 0
                                    ?
                                    <View style={styles.floatContainer}>
                                        <ListView
                                            enableEmptySections
                                            dataSource={this.dataSource}
                                            renderRow={(locationsList) => <LocationListItem locationsList={locationsList} navigation={this.props} currentPosition={this.state.region} />}
                                        />
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        :
                        <SearchComponent props={this.props} currentPosition={this.state.region} />

                }
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
        // marginTop: 5,
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: 'black'
    },
    floatContainer: {
        flex: 1,
        position: 'absolute',
        height: 200,
        bottom: 5,
        left: 0,
        right: 0
    },
}

export default connect(mapStateToProps, { getNearByPlaces, getPlaceSearch })(Map);