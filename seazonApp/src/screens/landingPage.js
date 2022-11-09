import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from 'react-native-web-swiper'

const LandingPage = ({ navigation }) => {
    
    const swiperRef = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);

    const BG = {
        0: require('../../assets/img/landingPage0.png'),
        1: require('../../assets/img/landingPage1.png'),
        2: require('../../assets/img/landingPage2.png')
    }

    const slideObject = {
        slide0: {
            title: 'Maximise your fitness',
            desc: "Whether you're here for food or fitness, we'll cater to your every need. Read through an array of articles, diets and learn more about healthy eating",
            image: require('../../assets/img/healthIcon.png')
        },
        slide1: {
            title: 'Discover new recipes',
            desc: 'Select your ingredients and discover thousands of recipes from all around the world',
            image: require('../../assets/img/locationIcon.png')
        },
        slide2: {
            title: 'Engage with our community',
            desc: 'Join our ever-growing global community and interact with content creators to learn, share and create new recipes',
            image: require('../../assets/img/groupIcon.png')
        },

    };

    const Slide = (props) => {
        return(
            <View style={styles().slideContainer}>
                <View style={styles().imageContainer}>
                    <Image
                    style={{ flex: 1, width: undefined, height: undefined, margin: 20}} 
                    source={props.image}/>
                </View>
                <Text style={styles().title}>{props.title} </Text>
                <Text style={styles().desc}>{props.desc} </Text>
            </View>
        )
    };

    return(
        <View style={styles().container}>
            <Image 
             style={[
                {height: '100%', width: '100%', position: 'absolute'}]}
             source={BG[pageIndex]}
             resizeMode='cover'/>
             <View style={{backgroundColor: '#00000099', flex: 1}}>
                <View style={{flex: 1, marginTop: '20%'}}>
                    <Swiper
                    style={{flex: 3}}
                    swiperRef={swiperRef}
                    onIndexChanged={(index) => setPageIndex(index)} 
                    controlsProps={{
                        prevPos: false,
                        nextPos: false}}
                    activeDotColor={'#E32828'}
                    resizeMode='contain'>
                        <Slide title={slideObject['slide0']['title']} desc={slideObject['slide0']['desc']} image={slideObject['slide0']['image']} />
                        <Slide title={slideObject['slide1']['title']} desc={slideObject['slide1']['desc']} image={slideObject['slide1']['image']} />
                        <Slide title={slideObject['slide2']['title']} desc={slideObject['slide2']['desc']} image={slideObject['slide2']['image']} />  
                    </Swiper>
                </View>
                <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={styles('').button} onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={styles().text}>SIGN UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles('login').button}>
                        <Text style={styles().text}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
             </View>              
        </View>
    )
}

const styles = (button) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12
    },
    section: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        height: 50,
        width: '80%',
        backgroundColor: button=='login'? '#E32828': '',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: button == 'login'? 0: 1,
        borderColor: button == 'login'? '': '#d3d3d3',
        marginBottom: 15,
        borderRadius: 4
    },
    slideContainer: {
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    desc: {
        fontSize: 14,
        textAlign: 'center',
        padding: 25,
        lineHeight: 20
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 30,
        backgroundColor: 'white',
        marginBottom: 40
    }
});

export default LandingPage;