import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BallIndicator } from 'react-native-indicators';
import { Bar } from 'react-native-progress'

//Global states
import { AuthContext } from '../../../Global/AuthContext';

// Firebase
import { getFunctions, httpsCallable } from 'firebase/functions'

// Components
import Swiper from 'react-native-web-swiper'
import RegistrationComplete from '../../components/signUp/registrationCompletion';

// Import slides
import SignUpPage0 from './signUpPage0';
import SignUpPage1 from './signUpPage1';
import SignUpPage2 from './signUpPage2';
import SignUpPage3 from './signUpPage3';
import SignUpPage4 from './signUpPage4';
import SignUpPage5 from './signUpPage5';
import SignUpPage6 from './signUpPage6';
import SignUpPage7 from './signUpPage7';

const SignUpPage = () => {

    const {
        isUserNew,
        setIsUserNew
    } = useContext(AuthContext)

    // Firebase Cloud functions
    const functions = getFunctions()
    const registerUser = httpsCallable(functions, 'registerUser')

    const [loading, setLoading] = useState(false)

    // Circular progress bar percentage
    const [progressPercentage, setProgressPercentage] = useState(1/8);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // User Data
    const [userData, setUserData] = useState({
        displayName: null,
        password: null,
        email: null,
        gender: 'N/A',
        age: 'N/A',
        cookingLevel: null,
        cookingFrequency: null,
        goals: [],
        findRecipes: [],
        lifestyle: null
    });

    const swiperRef = useRef(null);

    const errorMessages = {
        0: {
            'data': ['displayName', 'password', 'email'],
            'message': 'Please fill in your display name, email and password.'
        },
        1: {
            'data': ['gender'],
            'message': 'Please select your gender.'
        },
        2: {
            'data': ['age'],
            'message': 'Please select your age group.'
        },
        3: {
            'data': ['cookingLevel'],
            'message': 'Please select your cooking level.'
        },
        4: {
            'data': ['cookingFrequency'],
            'message': 'Please select how often you cook.'
        },
        5: {
            'data': ['goals'],
            'message': 'Please select your goals.'
        },
        6: {
            'data': ['findRecipes'],
            'message': 'Please select where you usually find recipes.'
        },
        7: {
            'data': ['lifestyle'],
            'message': 'Please select how active you are.'
        },
    };

    const registration = (data) => {
        // Loading screen
        setLoading(true)
        // Sign up
        registerUser(data)
            .then(() => {
                setIsUserNew(true)
            })
            .then(() => {
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
    };

    const nextPageChange = () => {
        let errorMessagesObject = errorMessages[swiperRef.current.state.activeIndex]
        let nullValues = []
        for (let value of errorMessagesObject['data']) {
            if (userData[value] == null || userData[value].length == 0) {
                nullValues.push(value)
            };
        };
        if (swiperRef.current.state.activeIndex == 7) {
            // Register new user if no missing data
            if (nullValues.length == 0) {
                registration(userData);
            } else {
                setErrorModal(true)
                setErrorMessage(errorMessagesObject['message'])
            }
        } else {
            if (nullValues.length == 0) {
                if (progressPercentage < (7 * 100 / 8)) {
                    swiperRef.current.goToNext()
                    setProgressPercentage(progressPercentage + (1 / 8))
                }
            } else {
                setErrorModal(true)
                setErrorMessage(errorMessagesObject['message'])
            }
        }
        console.log(userData)
    };

    const prevPageChange = () => {
        swiperRef.current.goToPrev()
        if (progressPercentage > 1 / 8) {
            setProgressPercentage(progressPercentage - (1 / 8))
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles().container}>
            <View style={{ alignItems: 'center' }}>
                <Bar
                    progress={progressPercentage}
                    width={325}
                    height={2.5}
                    color={'red'}
                    unfilledColor={'grey'}
                    borderWidth={0}
                    useNavitveDriver />
            </View>
            <View style={{ flex: 1 }}>
                {/* Swiper */}
                <Swiper
                    controlsProps={{
                        prevPos: false,
                        dotsPos: false,
                        nextPos: false
                    }}
                    ref={swiperRef}
                    gesturesEnabled={() => false}>
                    {/* Slides*/}
                    <SignUpPage0 setUserData={setUserData} />
                    <SignUpPage1 setUserData={setUserData} />
                    <SignUpPage2 setUserData={setUserData} />
                    <SignUpPage3 setUserData={setUserData} />
                    <SignUpPage4 setUserData={setUserData} />
                    <SignUpPage5 setUserData={setUserData} />
                    <SignUpPage6 setUserData={setUserData} />
                    <SignUpPage7 setUserData={setUserData} />
                </Swiper>
                {/* Bottom Nav */}
                <View style={styles().buttonSection}>
                    <View style={styles().buttonContainer}>
                        <TouchableOpacity
                            style={styles('prev').button}
                            onPress={() => prevPageChange()}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles().buttonContainer}>
                        <TouchableOpacity
                            style={styles('next').button}
                            onPress={() => nextPageChange()}>
                            <Text style={{ color: '#ffffff' }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                visible={errorModal}
                transparent
                animationType='fade'>
                <View style={styles().modalContainer}>
                    <View style={styles().modal}>
                        <View style={{ padding: 20 }}>
                            <Text style={styles().modalTitle}>Hold on!</Text>
                            <Text style={styles().modalDesc}>{errorMessage}</Text>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity style={styles().modalConfirm} onPress={() => setErrorModal(false)}>
                                    <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Okay!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={loading}
                animationType={'fade'}>
                <View style={{ backgroundColor: '#151515', flex: 1 }}>
                    <BallIndicator color='white' />
                </View>
            </Modal>
            <Modal
                visible={isUserNew}
                animationType={'slide'}>
                <View style={{ flex: 1 }}>
                    <RegistrationComplete email={userData.email} password={userData.password} />
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    )
};

const styles = (button) => StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1
    },
    buttonSection: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ffffff25',
        borderTopWidth: 0.5
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10
    },
    button: {
        height: '100%',
        width: '90%',
        backgroundColor: button == 'next' ? '#E32828' : '#00000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderColor: button == 'next' ? '' : '#757882',
        borderWidth: button == 'next' ? 0 : 0.5
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '80%',
        backgroundColor: '#121212',
        borderTopColor: 'red',
        borderTopWidth: 2
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    modalDesc: {
        fontSize: 12,
        paddingTop: 10,
        lineHeight: 25
    },
    modalConfirm: {
        height: 35,
        width: 100,
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignUpPage;