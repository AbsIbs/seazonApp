import React from "react";
import { Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const SignUpCompleteBanner = () => {
    return(
        <LinearGradient 
         start={{x: 0, y:0}} 
         end={{x:1, y:0}} 
         colors={['#Eb2962', '#FE443B']} 
         style={styles().container}>
                <Text style={styles().title}>
                    You're all set!
                </Text>
                <Text style={styles().desc}>
                    A warm welcome to the community
                </Text>
        </LinearGradient>
    )
};

const styles = () => StyleSheet.create({
    container: {
        height: 175, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 35, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        marginBottom: 5,
        textAlign: 'center'
    },
    desc: {
        color: '#ffffff'
    }
});

export default SignUpCompleteBanner;