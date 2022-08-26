import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyle from '../utils/globalStyle';

const SignInPage = () => {
    return(
        <View style={styles.Container}>
            <Text>
                Hello world
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default SignInPage;