import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const RecipeMacros = (props) => {

    const [test, setTest] = useState('')

    const changeHandler = (e) => {
        const input = e.nativeEvent.text
        setTest(input)
    }
    
    return(
        <View style={{alignItems: 'center'}}>
            <View style={styles().container}>
                <View style={styles(props.title).contentContianer}>
                    <View style={styles().textContainer}>
                        <View>
                            <Text style={styles().title}>{props.title}</Text>
                            <Text style={styles().desc}>{props.desc}</Text>
                        </View>
                    </View>
                    <View style={styles().inputContainer}>
                        <TextInput
                         placeholder="-"
                         keyboardType="numeric"
                         clearTextOnFocus={true}
                         onEndEditing={(e) => changeHandler(e)}
                         style={{color: '#E84A4A', fontWeight: 'bold'}}
                         placeholderTextColor='#E84A4A' />
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = (title) => StyleSheet.create({
    container: {
        height: 60,
        width: '90%',
        flexDirection: 'row'
    },
    contentContianer: {
        borderTopWidth: 1,
        borderBottomWidth: title == 'Protein'? 1: 0,
        borderColor: '#ffffff20',
        flexDirection: 'row',
        width: '100%'
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 8
    },
    inputContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 2
    },
    title: {
        fontSize: 13,
        color: '#ffffff'
    },
    desc: {
        fontSize: 11,
        color: '#757882'
    }
});

export default RecipeMacros;