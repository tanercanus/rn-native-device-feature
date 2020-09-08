import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {

    //redux thunk syntax
    return async dispatch => {

        //"uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Frn-native-device-feature-52488b1e-8155-4fae-bfb2-b588972a73c7/ImagePicker/146f2399-13b4-49d3-a1a2-2ec80c2a76bf.jpg"
        //Below returns 146f2399-13b4-49d3-a1a2-2ec80c2a76bf.jpg
        const fileName = image.split('/').pop();//Get the elemenst of the array
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3);
            console.log(dbResult);

            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    }
};