import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyle from '../utils/globalStyle';

//components
import pleaseNote from '../components/pleaseNote';
import cookingOften from '../components/cookingOften';

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage4 = () => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.container}>
                        {pleaseNote(message)} 
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>How often do you cook?</Text>
                    </View>
                    <View style={styles.formContainer}>
                        {cookingOften()}
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
    container: {
        paddingTop: 20
    },
    title: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16
    },
    formContainer: {
        flex: 1,
        paddingTop: 10
    }
});

export default SignUpPage4;