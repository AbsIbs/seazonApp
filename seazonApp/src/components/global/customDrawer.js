import React, { useState } from "react";
import { View, StyleSheet, Text, Modal } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { getAuth } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserProfileImage from "../recipeUpload/userProfileImage";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BallIndicator } from 'react-native-indicators';

const CustomDrawer = (props) => {

    const auth = getAuth();

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[styles.profileSection]}>
                <UserProfileImage height={90} width={90} />
                <Text style={styles.displayName}>{auth.currentUser.displayName}</Text>
                {/* Render email verified UI */}
                {auth.currentUser.emailVerified ?
                    null :
                    <TouchableOpacity style={styles.emailVerifiedUI}>
                        <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>Please verify email</Text>
                        <AntDesign size={20} name={'exclamationcircle'} color={'black'} />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.listContainer}>
                <DrawerContentScrollView>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={styles.lowerContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        setLoading(true)
                        auth.signOut()
                    }}>
                        <MaterialCommunityIcons
                            name={'logout'}
                            size={20}
                            color={'white'} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={loading}
                animationType={'fade'}>
                <View style={{ backgroundColor: '#151515', flex: 1 }}>
                    <BallIndicator color='white' />
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17181C'
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        borderBottomColor: '#2B303C',
        borderBottomWidth: 1
    },
    listContainer: {
        flex: 7,
        paddingVertical: 10
    },
    displayName: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 10
    },
    emailNotVerifiedUI: {
        height: 35,
        width: 140,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    lowerContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        height: 40,
        width: 150,
        backgroundColor: '#2B303C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutText: {
        paddingHorizontal: 5,
        color: 'white',
        fontSize: 12
    }
});

export default CustomDrawer;