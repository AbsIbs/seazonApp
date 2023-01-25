import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';

// Global state
import { AuthContext } from '../../Global/AuthContext';

const Explore = () => {

    const navigation = useNavigation()

    const Icon = (props) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={props.name}
                    size={15}
                    color={'white'} />
            </View>
        )
    };

    const actions = [{
        text: "Recipe",
        icon: <Icon name='note-plus' />,
        name: 'Recipe Form',
        position: 1,
        color: '#E84A4A'
    }];

    const { isUserNew, setIsUserNew } = useContext(AuthContext);

    useEffect(() => {
        if (isUserNew) {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setIsUserNew(false)
                })
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>Explore</Text>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: isUserNew ? 'red' : 'white' }]} onPress={() => navigation.openDrawer()}>

                </TouchableOpacity>
            </View>
            <View style={{ position: 'relative', marginBottom: '20%' }}>
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        navigation.navigate(name);
                    }}
                    color='#E84A4A'
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        color: 'white'
    },
    button: {
        height: 60,
        width: 50
    }
});

export default Explore;