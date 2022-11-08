import React, {useState} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const highlightCircle = (text, image) => {

    const [highlight, setHighlight] = useState(false)

    const toggle = () => {
        setHighlight(!highlight)
    };

    return(
        <View>
            <TouchableOpacity
              style={styles(highlight).circle}
              onPress={()=>toggle()}>
                <Image 
                  style={styles().image}
                  source={image} />
            </TouchableOpacity>
            <Text style={styles(highlight).text}>{text}</Text>
        </View>
    )
};

const styles = (highlight) => StyleSheet.create({
    circle: {
        height: 100,
        width: 100,
        backgroundColor: '#272727',
        borderWidth: highlight? 4: 2,
        borderRadius: 50,
        borderColor: highlight? '#E84A4A': '#ffffff87',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: highlight? '#E84A4A': '#ffffff87',
        paddingTop: 5,
        color: highlight? '#E84A4A': '#ffffff87',
        fontWeight: highlight? 'bold': 'normal'
    },
    image: {
        height: 60,
        width: 60
    }
});

export default highlightCircle;