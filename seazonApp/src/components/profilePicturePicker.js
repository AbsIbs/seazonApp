import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary, launchCamera } from "react-native-image-picker"

const ProfilePicturePicker = (props) => {

    // states
    const [activeType, setActiveType] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const LibraryCircle = () => {
        return(
            <TouchableOpacity style={styles.button} onPress={galleryUploadHandler}>
                <MaterialIcons 
                    name='photo-library' 
                    size={30}
                    color='#ffffff' />
            </TouchableOpacity>
        )
    };

    const CameraCircle = () => {
        return(
            <TouchableOpacity style={styles.button} onPress={cameraLaunchHandler}>
                <MaterialCommunityIcons 
                    name='camera-plus' 
                    size={30}
                    color='#ffffff' />
            </TouchableOpacity>
        )
    };

    // Launch library
    const galleryUploadHandler = () => {
        let options = {
            storageOption: {
            path: 'images',
            mediaType: 'photo',
            },
            includeBase64: false
        };
        // Upload chosen image
        launchImageLibrary(options, response => {
            if (response['didCancel']) {
                null;
            } else {
                setActiveType('galleryProfilePicture')
                setProfilePicture({uri: response.assets[0].uri})
            }
        });
    };

    const cameraLaunchHandler = () => {
        let options = {
            storageOption: {
            path: 'images',
            mediaType: 'photo',
            },
            includeBase64: false
        };
        // launch camera
        launchCamera(options, response => {
            if (response['didCancel']) {
                null;
            } else {
                setActiveType('galleryProfilePicture')
                setProfilePicture({uri: response.assets[0].uri})
            }
        })
    };

    const defaultImageHandler = () => {
        setActiveType('defaultUser')
        setProfilePicture(require('../../assets/img/defaultUser.png'))
    }

    useEffect(() => {
        props.setUserData(prevState => {
            return({...prevState, attributes: {...prevState.attributes, picture: profilePicture}})
        })
    }, [profilePicture])

    const DefaultUserImageCircle = () => {
        return(
            <View style={[styles.defaultButtonContainer, {borderColor: activeType == 'defaultUser'? '#E84A4A': null, borderWidth: activeType=='defaultUser'? 2: 0}]}>
                <TouchableOpacity style={styles.button} onPress={defaultImageHandler}>
                    <MaterialCommunityIcons 
                     name='account' 
                     size={40}
                     color='#ffffff' />
                </TouchableOpacity>
            </View>
        )
    };

        // Pick profile image
/*     useEffect(() => {
       props.setUserData(prevState => {
        return({...prevState, attributes: {...prevState.attributes, gender: Object.keys(activeIndex).find(key => activeIndex[key] === true)}})
       }) 
    }, [activeIndex]); */


    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 20}}>
                <View style={{paddingRight: 20}}>
                    <LibraryCircle userData={props.userData}/>
                </View>
                <View style={{paddingRight: 20}}>
                    <CameraCircle userData={props.userData} />
                </View>
                <View style={{paddingRight: 20}}>
                    <DefaultUserImageCircle userData={props.userData} />
                </View>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    defaultButtonContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 90,
        width: 90,
        borderRadius: 55,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold'
    },
    image: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 70, 
        height: 70, 
        borderRadius: 35
    },
    colorPickerContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorPicker: {
        height: 20,
        width: 20,
        borderRadius: 10
    }
});

export default ProfilePicturePicker;