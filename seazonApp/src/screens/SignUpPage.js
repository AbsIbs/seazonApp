import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import SignUpBanner from '../components/signUpBanner';
import Swiper from 'react-native-web-swiper'

// Import slides
import SignUpPage1 from './signUpPage1';
import SignUpPage2 from './signUpPage2';
import SignUpPage3 from './signUpPage3';
import SignUpPage4 from './signUpPage4';
import SignUpPage5 from './signUpPage5';
import SignUpPage6 from './signUpPage6';
import SignUpPage7 from './signUpPage7';
import SignUpPage8 from './signUpPage8';

const SignUpPage = ({ navigation }) => {

    // Circular progress bar percentage
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // User Data
    const [userData, setUserData] = useState({
        username: null,
        password: null,
        email: null,
        gender: null,
        age: null,
        cookingLevel: null,
        cookingFrequency: null,
        goals: [],
        findRecipes: [],
        lifestyle: null,
        allergies: [],
        dietaryRequirements: [],
        picture: null
    });

    const swiperRef = useRef(null);

    const errorMessages = {
        0: {
            'data': ['username', 'password', 'email'],
            'message': 'Please fill in your Username, Email and password'
        },
        1: {
            'data': ['picture'],
            'message': 'Please select a profile image. You can upload your own or select the default picture.'
        }
    };

    const newPageChange = (instruction) => {
        if(instruction == 'next') {
            let errorMessagesObject = errorMessages[swiperRef.current.state.activeIndex]
            let nullValues = []
            for (let value of errorMessagesObject['data']) {
                if (userData[value] == null) {
                    nullValues.push(value)
                };
            };
            if (nullValues.length == 0) {
                if (progressPercentage < (7*100/8)) {
                    swiperRef.current.goToNext()
                    setProgressPercentage(progressPercentage + (100/8))
                }
            } else {
                setErrorModal(true)
                setErrorMessage(errorMessagesObject['message'])
            }
        } else {
            swiperRef.current.goToPrev()
            if (progressPercentage > 0) {
                setProgressPercentage(progressPercentage - (100/8))
            }
        }
        console.log(userData)
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles().container}>
            {/* Banner */}
            <SignUpBanner navigation={navigation} percentage={progressPercentage} userData={userData} setUserData={setUserData} />
            {/* Swiper */} 
            <Swiper 
              controlsProps={{
                prevPos: false,
                dotsPos: false,
                nextPos: false}}
              ref={swiperRef}
              gesturesEnabled={() => false}>
                {/* Slides*/}
                <SignUpPage1 setUserData={setUserData} />
                <SignUpPage2 setUserData={setUserData} userData={userData} />  
                <SignUpPage3 setUserData={setUserData} />
                <SignUpPage4 setUserData={setUserData} />
                <SignUpPage5 setUserData={setUserData} />
                <SignUpPage6 setUserData={setUserData} />
                <SignUpPage7 setUserData={setUserData} />
                {/* <SignUpPage8 setUserData={setUserData} />  */}
            </Swiper>
            {/* Bottom Nav */}
            <View style={styles().buttonSection}>
                <View style={styles().buttonContainer}>
                    <TouchableOpacity 
                    style={styles('prev').button}
                    onPress={() => newPageChange('prev')}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().buttonContainer}>
                    <TouchableOpacity 
                    style={styles('next').button}
                    onPress={() => newPageChange('next')}>
                        <Text style={{color: '#ffffff'}}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
            visible={errorModal}
            transparent>
                <View style={styles().modalContainer}>
                    <View style={styles().modal}>
                        <View style={{padding: 20}}>
                            <Text style={styles().modalTitle}>Hold on!</Text>
                            <Text style={styles().modalDesc}>{errorMessage}</Text>
                            <View style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity style={styles().modalConfirm} onPress={() => setErrorModal(false)}>
                                <Text style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>Okay!</Text>
                            </TouchableOpacity>
                            </View> 
                        </View>
                    </View>
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
        backgroundColor: button == 'next'? '#E32828': '#00000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderColor: button == 'next'? '': '#757882',
        borderWidth: button == 'next'? 0: 0.5
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000080', 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      modal: {
        height: 200,
        width: '80%',
        backgroundColor: '#151515',
        borderRadius: 15
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