import React from "react";
import { ImageBackground, View, Text, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo'

// Componenets
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { launchImageLibrary } from "react-native-image-picker"

function SignUpBanner(props) {

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
        <LinearGradient start={{x: 0, y:0}} end={{x:1, y:0}} colors={['#Eb2962', '#FE443B']} style={styles().gradientContainer}>
            <View style={styles().contentContainer}>
                <View style={styles().leftContainer}>
                    <TouchableOpacity
                        onPress={props.navigation.goBack}
                        style={styles().goback}>
                        <Entypo 
                        name={'cross'}
                        size={20}
                        color={'#ffffff'}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles().title}>Sign Up</Text>
                        <Text style={styles().desc}>Hello, we'd love to know you!</Text>
                    </View>
                </View>
                {props.userData.attributes.picture == null?
                    <View style={styles().rightContainer}>
                        <AnimatedCircularProgress
                         size={120}
                         width={3}
                         fill={props.percentage}
                         tintColor="#ffffff"
                         backgroundColor="#ffffff50"
                         rotation={0} >
                        </AnimatedCircularProgress>
                    </View>
                :
                <TouchableOpacity style={styles().rightContainer} onPress={galleryUploadHandler}>
                    <AnimatedCircularProgress
                    size={120}
                    width={3}
                    fill={props.percentage}
                    tintColor="#ffffff"
                    backgroundColor="#ffffff50"
                    rotation={0} 
                    >
                        {() => (
                            <ImageBackground
                            resizeMode='cover' 
                            source={props.userData.attributes.picture}
                            style={{ height: Number.isInteger(props.userData.attributes.picture)? 50: 100, width: Number.isInteger(props.userData.attributes.picture)? 50: 100}}
                            imageStyle={{borderRadius: 50}}/>
                        )}
                    </AnimatedCircularProgress>
                </TouchableOpacity>
                }
                
            </View>
        </LinearGradient>
    )
};

const styles = () => StyleSheet.create({
    gradientContainer: {
        height: 175,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    leftContainer: {
        flex: 2
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        marginBottom: 5
    },
    desc: {
        color: '#ffffff'
    },
    goback: {
        height: 60, 
        width: 60, 
        borderRadius: 30,
        backgroundColor: '#ffffff20',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignUpBanner;