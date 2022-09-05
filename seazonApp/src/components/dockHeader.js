import React, {useState} from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const icon = (iconName) => {
    return(
        <FontAwesome5
        name={iconName}
        color = '#ffffff87'
        size = {17.5}
        />
    )
};

const DockHeader = ({title}) => {
    return(
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().topContainer}>
                    <View style={styles().titleContainer}>
                        <Text style={styles().title}>{title}</Text>
                    </View>
                    <View style={styles().buttonContainer}>
                        <View style={styles().button}>
                            
                        </View>
                    </View>
                    <View style={styles().buttonContainer}>
                        <View style={styles().button}>
                            {icon('bell')}
                        </View>
                    </View>
                    <View style={styles().buttonContainer}>
                        <View style={styles().button}>
                            {icon('cog')}
                        </View>
                    </View>
                </View>
                <View style={styles().bottomContainer}>
                    <View style={styles().searchBar}>
                        <View style={{paddingLeft: 15}}>
                            {icon('search')}
                        </View>
                        <TextInput 
                         style={styles().searchText}
                         placeholder="Search for recipes, posts and accounts"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = () => StyleSheet.create({
    outerContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff25',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center' ,
        backgroundColor: '#121212'       
    },
    innerContainer: {
        width: '90%'
    },
    topContainer: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    bottomContainer: {
    },
    titleContainer: {
        flex: 4
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        height: 35,
        width: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff50',
        backgroundColor: '#ffffff10'
    },
    searchBar: {
        width: '100%',
        borderRadius: 40,
        height: 35,
        backgroundColor: '#ffffff10',
        borderWidth: 1,
        borderColor: '#ffffff50',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchText: {
        fontSize: 12,
        color: '#ffffff50',
        paddingLeft: 10
    }
});

export default DockHeader;