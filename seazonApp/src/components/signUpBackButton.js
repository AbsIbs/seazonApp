import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

const signUpBackButton = (navigation, navigationDestination) => {
    return(
            <TouchableOpacity 
            style={{justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20}}
            onPress={() => navigation.navigate(navigationDestination)}>
                <Image
                    style={{width: 50, height: 50}} 
                    source={require('../../assets/img/iconNext.png')}/>
            </TouchableOpacity>
    )
};

export default signUpBackButton;