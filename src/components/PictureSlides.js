import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { CardSection } from './common';

class PictureSlides extends Component {
    renderPictures() {
        return this.props.Pictures.map((picture, index) => {
            console.log('REFERENCE', picture.photo_reference)
            return (
                <Image key={index} style={styles.imageStyle} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${picture.photo_reference}&key=AIzaSyB1frgnPYvJ4N4q2kjHoKk8rnC2VYfKhr4` }} />
            );
        })
    }
    render() {
        return (

            <View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    centerContent
                >
                    {this.renderPictures()}
                </ScrollView>
            </View>

        );
    }
}

const styles = {
    imageStyle: {
        height: 200,
        flex: 1,
        // justifyContent: 'space-around',
        width: Dimensions.get('window').width,

    },
}
export default PictureSlides;