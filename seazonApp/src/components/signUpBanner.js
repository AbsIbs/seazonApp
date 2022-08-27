import React from "react";
import { Image, View, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

function SignUpBanner(text, navigation) {
    return(
        <LinearGradient start={{x: 0, y:0}} end={{x:1, y:0}} colors={['#Eb2962', '#FE443B']} style={{height: 175, width: '100%'}}>
            <View style={{justifyContent: 'center', height: '100%', marginLeft: '5%'}}>
                <TouchableOpacity
                    onPress={navigation.goBack}>
                    <Image source={require('../../assets/img/iconBack.png')} style={{resizeMode: 'cover', height: 45, width: 45, marginBottom: 10}}/>
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#ffffff', marginBottom: 5}}>
                    Sign Up
                </Text>
                <Text style={{color: '#ffffff'}}>
                    {text}
                </Text>
            </View>
        </LinearGradient>
    )
};

export default SignUpBanner;