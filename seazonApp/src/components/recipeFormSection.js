import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const recipeFormSection = (props) => {
    if (props.type == 'multimedia') {
        return (
            <View>
                <View style={styles().outerInputSection}>
                    <View 
                     style={styles(props.height, props.type).sectionInput}>
                        <MaterialCommunityIcons
                        name={props.iconName}
                        color = {'#ffffff'}
                        size = {35}
                        />
                        <Text
                         style={styles().sectionTitle}>
                            {props.title}
                        </Text>
                    </View>
                </View>
            </View>
        )
    } else if (props.type == 'text') {
        return (
            <View>
                <Text style={styles().outerSectionTitle}>{props.title}</Text>
                    <View style={styles().outerInputSection}>
                        <TextInput
                          style={[styles(props.height, props.type).sectionInput]}
                          placeholder={props.placeholder}
                          placeholderTextColor='#ffffff50'
                          fontSize={12}
                          color='white'
                          multiline={true}
                          textAlignVertical='top'>
                    </TextInput>
                </View>
            </View>
        )
    }
};

const styles = (height, type) => StyleSheet.create({
    sectionTitle: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold'
    },
    outerSectionTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20
    },
    outerInputSection: {
        alignItems: 'center'
    },
    sectionInput: {
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    borderColor: '#ffffff30',
    borderWidth: 1.5,
    height: height,
    width: '95%',
    justifyContent: type == 'text'? 'flex-start': 'center',
    paddingLeft: type == 'text'? 10: 0,
    alignItems: (type == 'text' && height <=35 || (type == 'multimedia'))? 'center': 'stretch',
    borderRadius: 3
    }
});

export default recipeFormSection;