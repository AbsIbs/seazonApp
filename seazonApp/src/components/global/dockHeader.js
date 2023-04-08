import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const DockHeader = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Pressable style={styles.hamburgerContainer} onPress={() => navigation.openDrawer()} hitSlop={20}>
                    <View style={[{ width: '100%', backgroundColor: 'white' }, styles.hamburgerLine]}></View>
                    <View style={[{ width: '60%', backgroundColor: 'white' }, styles.hamburgerLine]}></View>
                    <View style={[{ width: '35%', backgroundColor: 'white' }, styles.hamburgerLine]}></View>
                </Pressable>
                <Text style={styles.text}>{props.name}</Text>
                <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                    <AntDesign name={'search1'} color={'white'} size={20} />
                    <View style={{ paddingLeft: 15 }}>
                        <AntDesign name={'user'} color={'white'} size={20} />
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    hamburgerContainer: {
        width: 17.5,
        height: 20,
        justifyContent: 'space-evenly',
    },
    hamburgerLine: {
        height: 1.75,
        borderRadius: 25
    },
    text: {
        fontWeight: 'bold',
        paddingLeft: 20,
        fontSize: 16,
        color: 'white'
    }
});

export default DockHeader;