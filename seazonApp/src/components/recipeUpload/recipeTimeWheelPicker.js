import React from "react";
import { Modal, View, StyleSheet } from "react-native";

const RecipeTimeWheelPicker = (props) => {
    return(
        <Modal
         visible={props.modalState}
         transparent
         animationType="fade">
            <View style={styles().container}>
                <View style={styles().pickerContainer}></View>
            </View>
        </Modal>
    )
};

const styles = () => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    pickerContainer: {
        height: 200,
        width: '100%',
        backgroundColor: 'white'
    }
});

export default RecipeTimeWheelPicker;