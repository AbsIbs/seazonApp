import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SignUpBanner from '../components/signUpBanner';
import globalStyle from '../utils/globalStyle';

// components
import pleaseNote from '../components/pleaseNote';
import genderList from '../components/genderList';
import ageList from '../components/ageList';
import signUpNextButton from '../components/signUpNextButton';

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage2 = ({ navigation }) => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                {SignUpBanner('Please tell us about yourself', navigation, 34)}
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
                    <View style={{paddingTop: 20}}>
                        {signUpNextButton(navigation, 'Sign Up Page 3')}
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