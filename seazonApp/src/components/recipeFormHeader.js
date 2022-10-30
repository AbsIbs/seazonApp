import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from "react-native";

const RecipeFormHeader = (navigation) => {

    return(
        <View style={styles().container}>
            <View style={styles().topContainer}>
                <TouchableOpacity 
                 style={styles().textContainer}
                 onPress={() => navigation.goBack()}>
                    <Text style={styles().cancel}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles().textContainer}>
                    <Text style={styles().uploadRecipe}>Upload recipe</Text>
                </View>
                <View style={styles().textContainer}>
                </View>
            </View>
        </View>
    )
};

const styles = () => StyleSheet.create({
    container: {
        paddingTop: 15,
        height: 50,
        backgroundColor: 'black'
    },
    topContainer: {
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1
    },
    cancel: {
        textAlign: 'left',
        paddingLeft: 15
    },
    uploadRecipe: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff'
    },
    postContainer: {
        height: 25,
        width: 60,
        backgroundColor: '#E32828',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    post: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 12
    },
});

export default RecipeFormHeader;