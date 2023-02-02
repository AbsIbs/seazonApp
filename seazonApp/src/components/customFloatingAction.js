import React from "react";
import { View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";

const CustomFloatingAction = () => {

    const navigation = useNavigation();

    const actions = [
        {
            text: "Recipe",
            icon: <Icon name='note-plus' />,
            name: 'Recipe Form',
            position: 1,
            color: '#E84A4A'
        },
        {
            text: "Recipe Request",
            icon: <Icon name='chat-question' />,
            name: 'RecipeRequest',
            position: 2,
            color: '#E84A4A'
        }];

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

    return (
        <FloatingAction
            actions={actions}
            onPressItem={name => {
                navigation.navigate(name);
            }}
            color='#E84A4A'
            distanceToEdge={{ vertical: 100, horizontal: 20 }}
            overlayColor='#000000'
        />

    )
};

export default CustomFloatingAction;