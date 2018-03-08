import axios from 'axios';
import {
    FETCH_LOCATION_SUCCESSFUL,
    FETCH_LOCATION_DETAIL_SUCCESSFUL,
    GET_POLYLINE,
    FETCH_LOCATION_SEARCH_SUCCESSFUL
} from './types';
import Polyline from '@mapbox/polyline';

const nearBySearchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const placeDetailUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
const placeDirectionUrl = 'https://maps.googleapis.com/maps/api/directions/json';

const key = 'AIzaSyA-7Ji5LkGy-_gH-RuZeVIV3m6zOuVUZPA';

export const getNearByPlaces = (latitude, longitude) => {
    console.log('LATITUDE ', latitude, 'LONGITUDE ', longitude)
    return (dispatch) => {
        axios.get(`${nearBySearchUrl}?location=${latitude},${longitude}&radius=500&key=${key}`)
            .then((response) => {
                // console.log(response.data.results);
                dispatch({ type: FETCH_LOCATION_SUCCESSFUL, payload: response.data.results })
            })
    };
};
export const getLocationSearch = (text) => {
    console.log('TEXT', text)
    return (dispatch) => {
        axios.get(`${autoCompleteUrl}?input=${text}&key=${key}`)
            .then((response) => {
                dispatch({ type: FETCH_LOCATION_SEARCH_SUCCESSFUL, payload: response.data.predictions })
            })
    }
}
export const getLocationDetail = (place_id, navigation, currentPostion) => {
    console.log('PLACE ID ', place_id, currentPostion)
    return (dispatch) => {
        axios.get(`${placeDetailUrl}?placeid=${place_id}&key=${key}`)
            .then((response) => {
                // console.log(response.data.results);
                dispatch({ type: FETCH_LOCATION_DETAIL_SUCCESSFUL, payload: response.data.result });
                console.log(currentPostion)
                navigation.navigate('DetailComponent', currentPostion);
            })
    };
}

export const getDirections = (startLoc, destinationLoc) => {
    console.log('START lOCATION', startLoc, 'END lOCATION', destinationLoc)
    start = `"${startLoc.latitude},${startLoc.longitude}"`
    destination = `"${destinationLoc.lat},${destinationLoc.lng}"`
    return (dispatch) => {
        axios.get(`${placeDirectionUrl}?origin=${start}&destination=${destination}`)
            .then((response) => {
                console.log(response.data);
                // response = JSON.parse(response);
                // console.log(response);
                const points = Polyline.decode(response.data.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                });
                dispatch({ type: GET_POLYLINE, payload: coords })
                // navigation.navigate('Map');
            })
    };
};