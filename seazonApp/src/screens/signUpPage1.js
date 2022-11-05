import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import SignInTextField from '../components/signInTextField';
import globalStyle from '../utils/globalStyle';

// Components
import { launchImageLibrary } from "react-native-image-picker"

const SignUpPage1 = (props) => {

    // Upload image
    const galleryUploadHandler = () => {
        let options = {
          storageOption: {
            path: 'images',
            mediaType: 'photo',
          },
          includeBase64: false
        };
        // Store the image
        launchImageLibrary(options, response => {
          if (response['didCancel']) {
            null;
          } else {
            props.setUserData(prevState => {
                return({...prevState, attributes: {...prevState.attributes, picture: {uri: response.assets[0].uri}}})
            })
          }
        });
    };

    return( 
        <ScrollView>
            <View style={globalStyle.signUpContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.uploadContainer}> 
                        <View style={styles.textContainer}>
                            <Text style={styles.Title}>
                                Upload your image
                            </Text>
                            <Text style={styles.Desc}>
                                This image will be visible to other users
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={galleryUploadHandler}>
                                <Image
                                    style={{width: 80, height: 80}}
                                    source={require('../../assets/img/cameraAdd.png')}/>
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={styles.formContainer}>
                        <SignInTextField iconName='envelope' placeholder='Email' secure={false} userData={props.userData} setUserData={props.setUserData} />
                        <SignInTextField iconName='user' placeholder='Username' secure={false} userData={props.userData} setUserData={props.setUserData} />
                        <SignInTextField iconName='lock' placeholder='Password' secure={true} userData={props.userData} setUserData={props.setUserData} />
                    </View>
                </View>
            </View>
        </ScrollView>
    ) 
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    uploadContainer: {
        paddingTop: 40,
        flexDirection: 'row'
    },
    formContainer: {
        paddingTop: 40
    },
    textContainer: {
        flex: 9,
        justifyContent: 'center'
    },  
    Title: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '500'
    },
    Desc: {
        fontSize: 12,
        color: '#ffffff87'
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignUpPage1;