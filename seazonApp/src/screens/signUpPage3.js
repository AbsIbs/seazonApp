import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

//components
import CookingLevelList from '../components/cookingLevelList';

const SignUpPage3 = (props) => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.Desc}>
                        We'd love to know you
                    </Text>
                    <Text style={styles.Title}>
                        What is your cooking level?
                    </Text>
                    <View style={{ paddingTop: 50, height: 200 }}>
                        <CookingLevelList setUserData={props.setUserData} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    textContainer: {
        paddingTop: 50,
        justifyContent: 'center'
    },
    Title: {
        fontSize: 22.5,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    Desc: {
        fontSize: 14,
        color: '#ffffff87',
        paddingTop: 2.5
    }
});

export default SignUpPage3;