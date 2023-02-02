import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FoodFeed = () => {

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

    return (
        <View style={styles.container}>
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    navigation.navigate(name);
                }}
                color='#E84A4A'
                distanceToEdge={{vertical: 100, horizontal: 20}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});

export default FoodFeed