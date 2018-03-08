import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import LocationListItem from './LocationListItem';
import { SearchBar } from 'react-native-elements'

class SearchComponent extends Component {
    // componentWillReceiveProps(nextProps) {
    //     this.createDataSource(nextProps);
    // };

    createDataSource({ locationSearch }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(locationSearch);
    }
    render() {
        console.log(this.props);
        return (
            <View>
                {/* <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(locationSearch) => <LocationListItem locationSearch={locationSearch} navigation={this.props} currentPosition={this.state.region} />}
                /> */}
            </View>
        )
    }
}

export default SearchComponent;