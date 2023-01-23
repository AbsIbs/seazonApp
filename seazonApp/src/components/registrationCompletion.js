import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-web-swiper";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const RegistrationComplete = (props) => {

    const auth = getAuth()

    const swiperRef = useRef(null);
    const [percentage, setPercentage] = useState(25);

    const nextHandler = () => {
        if (percentage < 100) {
            const newPercetage = percentage + 25
            swiperRef.current.goToNext()
            setPercentage(newPercetage)
        } else {
            signInWithEmailAndPassword(auth, props.email, props.password)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const Slide = (props) => {
        return (
            <View style={styles.slideContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={props.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        <Text style={{ color: '#E32828' }}>{props.firstWord}</Text>
                        {props.title}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.desc}>{props.desc}</Text>
                </View>
            </View>
        )
    };

    const slideObject = {
        0: {
            'firstWord': 'Welcome',
            'title': ' to the app',
            'desc': 'Your registration process is completed and you can now log in. A confirmation email has been sent to you.',
            'image': require('../../assets/img/locationIcon.png')
        },
        1: {
            'firstWord': 'Engage',
            'title': ' with our community',
            'desc': 'Interact with contect creators to learn, share and create new recipes from our ever-growing community',
            'image': require('../../assets/img/groupIcon.png')
        },
        2: {
            'firstWord': 'Maximise',
            'title': ' your fitness',
            'desc': "Whether you're here for food or fitness, we'll cater to your every need. Read through an array of articles, diets and learn more about healthy eating",
            'image': require('../../assets/img/healthIcon.png')
        },
        3: {
            'firstWord': 'Discover',
            'title': ' global recipes',
            'desc': 'Travel across the globe and discover thousands of recipes',
            'image': require('../../assets/img/locationIcon.png')
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Image
                style={{ height: '100%', width: '100%', position: 'absolute', opacity: 0.15 }}
                source={require('../../assets/img/registrationCompleteImage.png')}
                resizeMode='cover' />
            <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flex: 3 }}>
                    <Swiper
                        ref={swiperRef}
                        /* onIndexChanged={(index) => setPageIndex(index)} */
                        controlsProps={{
                            prevPos: false,
                            nextPos: false
                        }}
                        resizeMode={'contain'}>
                        <Slide title={slideObject[0]['title']} desc={slideObject[0]['desc']} image={slideObject[0]['image']} firstWord={slideObject[0]['firstWord']} />
                        <Slide title={slideObject[1]['title']} desc={slideObject[1]['desc']} image={slideObject[1]['image']} firstWord={slideObject[1]['firstWord']} />
                        <Slide title={slideObject[2]['title']} desc={slideObject[2]['desc']} image={slideObject[2]['image']} firstWord={slideObject[2]['firstWord']} />
                        <Slide title={slideObject[3]['title']} desc={slideObject[3]['desc']} image={slideObject[3]['image']} firstWord={slideObject[3]['firstWord']} />
                    </Swiper>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatedCircularProgress
                        size={100}
                        width={2}
                        fill={percentage}
                        tintColor="#Eb2962"
                        backgroundColor="#ffffff25"
                        rotation={0}
                    >
                        {() => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => nextHandler()}>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#Eb2962', '#FE443B']}
                                            style={styles.button}>
                                            <MaterialCommunityIcons
                                                size={30}
                                                color={'#ffffff'}
                                                name={'arrow-right-thin'} />
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    </AnimatedCircularProgress>
                </View>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 30,
        height: 120,
        width: 120,
        backgroundColor: 'white',
        marginTop: 60,
        marginBottom: 40
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        margin: 30
    },
    textContainer: {
        paddingVertical: 15,
        paddingHorizontal: 40
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    desc: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        lineHeight: 20
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#E32828',
        height: 70,
        width: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RegistrationComplete;