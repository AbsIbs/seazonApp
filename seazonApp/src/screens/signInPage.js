import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import SignInTextField from '../components/signInTextField';

const SignInPage = () => {

    const userData = {}

    const bg = require('../../assets/img/bg.png')

    return(
        <View style={styles.Container}>
            <ImageBackground
                source={null}
                resizeMode='cover'
                style={styles.backgroundImage}
                imageStyle={{opacity: 0.2}}>
                    <View style={styles.signUpContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Landing Page')}>
                            <Image 
                            source={require('../../assets/img/iconBack.png')} 
                            style={styles.backButton}/>
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={styles.title}>
                                Welcome back!
                            </Text>
                            <Text style={styles.text}>
                                Sign in to continue
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <SignInTextField iconName='envelope' placeholder='Email' secure={false} />
                            <SignInTextField iconName='lock' placeholder='Password' secure={true} />
                            <Text style={{textAlign: 'right', paddingBottom: 30, fontSize: 12}}>Forgetten Passoword?</Text>
                            <TouchableOpacity 
                             style={styles.signInButton}
                             onPress={() => navigation.navigate('Bottom Tabs Stack')}>
                                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                            <Text style={{color: '#ffffff87', fontSize: 12}}>
                                Login with social
                            </Text>
                        </View>
                            <View style={styles.logoContainer}>
                        </View>
                    </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#121212'
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
      },
    signUpContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '80%',
    },
    textContainer: {
        marginBottom: '25%'
    },
    title: {
        fontSize: 35,
        color: '#ffffff',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 12,
        color: '#ffffff87'
    },
    inputContainer: {
        marginTop: 70
    },
    signInButton: {
        height: 50,
        width: '100%',
        backgroundColor: '#E32828',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderRadius: 4
      },
    logoContainer: {
        flexDirection: 'row', 
        height: 50, 
        width: '100%', 
        justifyContent: 'center',
        marginBottom: 20
    },
    logoInner: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '65%', 
        flexDirection: 'row'
    },
    logos: { 
        resizeMode: 'contain',
        flex: 1,
        height: 50
    },
    backButton: {
        resizeMode: 'cover', 
        height: 45, 
        width: 45, 
        marginBottom: 10
    },
})

export default SignInPage;