import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';

// Global state
import { AuthContext } from '../../Global/AuthContext';


const Explore = () => {

    const { isUserNew, setIsUserNew } = useContext(AuthContext)

    useEffect(() => {
        if (isUserNew) {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setIsUserNew(false)
            })
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>Explore</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: isUserNew ? 'red' : 'white' }]} onPress={() => console.log(auth.currentUser.emailVerified)}>

            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    text: {
        color: 'white'
    },
    button: {
        height: 100,
        width: 100
    }
});

export default Explore;