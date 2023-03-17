import React from "react";
import { View, Text } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const dockLabels = (focused, iconName, dockName) => {
    return(
        <View>
            <FontAwesome5
            name={iconName}
            color = {focused? '#555': '#E84A4A'}
            size = {25}
            />
            <Text style = {{fontSize: 10, color: focused? '#555': '#E84A4A'}}>
                {dockName}
            </Text>
        </View>
    )
};

export default dockLabels;