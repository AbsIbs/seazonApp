import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const signUpNextButton = (navigation, navigationDestination) => {
    return(
            <View style={styles.container}>
                <TouchableOpacity 
                 style={styles.nextButton}
                 onPress={() => navigation.navigate(navigationDestination)}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/arrow.png')}/>
                </TouchableOpacity>
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end', 
        flexDirection: 'row', 
        marginBottom: 20
    },
    nextButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 15,
        height: 15
    }
});

export default signUpNextButton;