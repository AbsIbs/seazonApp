import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyle from '../utils/globalStyle';

// components
import pleaseNote from '../components/pleaseNote';
import GenderList from '../components/genderList';
import AgeList from '../components/ageList';

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage2 = (props) => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.container}>
                        {pleaseNote(message)} 
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Gender<Text style={{fontWeight: 'normal'}}>(optional)</Text></Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <GenderList setUserData={props.setUserData} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Age<Text style={{fontWeight: 'normal'}}>(optional)</Text></Text>
                    </View>
                    <View>
                        <AgeList setUserData={props.setUserData} /> 
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