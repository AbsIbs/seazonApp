import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from 'react-native-web-swiper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import BottomSheet from 'react-native-bottomsheet-reanimated';

const LandingPage = () => {

    const navigation = useNavigation()
    
    const swiperRef = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);
    const bottomSheetRef = useRef(null);

    const BG = {
        0: require('../../assets/img/landingPage0.png'),
        1: require('../../assets/img/landingPage1.png'),
        2: require('../../assets/img/landingPage2.png')
    }

    const slideObject = {
        slide0: {
            title: 'Engage with our community',
            desc: 'Join our ever-growing global community and interact with content creators to learn, share and create new recipes',
            image: require('../../assets/img/groupIcon.png')
        },
        slide1: {
            title: 'Maximise your fitness',
            desc: "Whether you're here for food or fitness, we'll cater to your every need. Read through an array of articles, diets and learn more about healthy eating",
            image: require('../../assets/img/healthIcon.png')
        },
        slide2: {
            title: 'Discover global recipes',
            desc: 'Travel across the globe and discover thousands of recipes',
            image: require('../../assets/img/locationIcon.png')
        }
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

    const ModalOption = (props) => {
        return(
            <TouchableOpacity style={styles().modalOption} onPress={() => {
                bottomSheetRef.current?.snapTo(0)
                navigation.navigate(props.destination)
                }}>
                <MaterialCommunityIcons 
                 name={props.icon} 
                 color={'#ffffff'} 
                 size={22.5}
                 style={{marginLeft: '7.5%', position: 'absolute'}} />
                <Text style={{flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 'bold'}}>Continue with {props.text}</Text>
            </TouchableOpacity>
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
                        activeDotColor={'red'}
                        resizeMode='contain'>
                            <Slide title={slideObject['slide0']['title']} desc={slideObject['slide0']['desc']} image={slideObject['slide0']['image']} />
                            <Slide title={slideObject['slide1']['title']} desc={slideObject['slide1']['desc']} image={slideObject['slide1']['image']} />
                            <Slide title={slideObject['slide2']['title']} desc={slideObject['slide2']['desc']} image={slideObject['slide2']['image']} />  
                        </Swiper>
                    </View>
                    <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles('').button} onPress={() => bottomSheetRef.current?.snapTo(1)}>
                            <Text style={styles().text}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles('login').button} 
                        onPress={() => navigation.navigate('Sign In')}>
                            <Text style={styles().text}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheet
                keyboardAware
                //bottomSheerColor="#121212"
                ref={bottomSheetRef}
                initialPosition={'0%'} //200, 300
                snapPoints={['0%', 300]}
                isBackDrop={true}
                isBackDropDismissByPress={true}
                isRoundBorderWithTipHeader={true}
                bounce={false}
                // backDropColor="red"
                // isModal
                containerStyle={{backgroundColor:"#121212"}}
                tipStyle={{backgroundColor:"white"}}
                // headerStyle
                // bodyStyle={styles().modal}
                header={null}
                body={
                    <View style={{backgroundColor: '#121212', alignItems: 'center'}}>
                        <ModalOption text={'Email'} icon={'email'} destination={'Sign Up'} />
                        <ModalOption text={'Apple'} icon={'apple'} destination={'Sign Up'} />
                        <ModalOption text={'Facebook'} icon={'facebook'} destination={'Sign Up'} />
                        <ModalOption text={'Google'} icon={'google'} destination={'Sign Up'} />
                    </View>
                }/>
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
    },
    modalOption: {
        width: '80%',
        height: 45,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        marginVertical: 7.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default LandingPage;