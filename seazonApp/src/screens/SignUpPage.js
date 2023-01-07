import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
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

    // User Data
    const [userData, setUserData] = useState({
        username: null,
        password: null,
        attributes: {
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
        }
    });

    const swiperRef = useRef(null);

    const newPageChange = (instruction) => {
        if(instruction == 'next') {
            if (progressPercentage < (7*100/8)) {
                swiperRef.current.goToNext()
                setProgressPercentage(progressPercentage + (100/8))
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
    }
});

export default SignUpPage;