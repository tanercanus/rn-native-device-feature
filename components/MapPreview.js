import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//Normally we need return google maps api
const MapPreview = props => {

    /*if (props.location) {
    }*/

    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}>
            {props.location ?
                (/*<Image style={styles.mapImage} source={imageSource} />*/
                    <Text style={styles.addressText}>Latitude: {props.location.lat}, Longitude: {props.location.lng}</Text>)
                :
                (props.children)
            }
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    addressText: {
        textAlign: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;