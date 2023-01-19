import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Firebase
import { auth, db } from '../../firebase/firebase-config';
import { setDoc, doc } from 'firebase/firestore/lite';

// Global state
import { AuthContext } from '../../Global/AuthContext';


const Explore = () => {

    const { isUserNew, setIsUserNew } = useContext(AuthContext)

    const buttonHandler = () => {
        console.log(auth)
    }

    const Create = () => {
        const myDoc = doc(db, 'users/Test User2')
        const docData = {
            'displayName': 'Abbs1029',
            'email': ''
        }

        setDoc(myDoc, docData)
            .then(() => {
                alert('Document created!')
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            <Text>Explore</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: isUserNew ? 'red' : 'white' }]} onPress={Create}>

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