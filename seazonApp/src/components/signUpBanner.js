import React from "react";
import { Image, View, Text, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProgressCircle from 'react-native-progress-circle'

function SignUpBanner(text, navigation, percentage) {
    return(
        <LinearGradient start={{x: 0, y:0}} end={{x:1, y:0}} colors={['#Eb2962', '#FE443B']} style={styles().gradientContainer}>
            <View style={styles().contentContainer}>
                <View style={styles().leftContainer}>
                    <TouchableOpacity
                        onPress={navigation.goBack}>
                        <Image 
                        source={require('../../assets/img/iconBack.png')} 
                        style={styles().backButton}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles().title}>
                            Sign Up
                        </Text>
                        <Text style={styles().desc}>
                            {text}
                        </Text>
                    </View>
                </View>
                <View style={styles().rightContainer}>
                    <ProgressCircle
                        percent={percentage}
                        radius={50}
                        borderWidth={3}
                        color='#ffffff'
                        shadowColor='#FD706D'
                        bgColor="#FA3E43"> 
                    </ProgressCircle>
                </View>
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
    backButton: {
        resizeMode: 'cover', 
        height: 45, 
        width: 45, 
        marginBottom: 10
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
    }
});

export default SignUpBanner;