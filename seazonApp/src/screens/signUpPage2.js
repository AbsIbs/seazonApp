import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyle from '../utils/globalStyle';

// components
import pleaseNote from '../components/pleaseNote';
import genderList from '../components/genderList';
import ageList from '../components/ageList';

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage2 = () => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.container}>
                        {pleaseNote(message)} 
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Gender<Text style={{fontWeight: 'normal'}}> (optional)</Text></Text>
                    </View>
                    <View style={styles.genderContainer}>
                        {genderList()}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Age<Text style={{fontWeight: 'normal'}}> (optional)</Text></Text>
                    </View>
                    <View>
                    {ageList()} 
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
    genderContainer: {
        paddingTop: 20,
        height: 175
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default SignUpPage2;