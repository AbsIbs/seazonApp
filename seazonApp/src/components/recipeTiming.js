import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from 'react-native-modal'
import { Picker } from 'react-native-wheel-pick';

const RecipeTiming = (props) => {

    const [prepTimeModalActive, setPrepTimeModal] = useState(false)
    const [cookingTimeModalActive, setCookingTimeModal] = useState(false)
    const [servingsModalActive, setServingsModal] = useState(false)

    const [prepMins, setPrepMins] = useState('-')
    const [prepHours, setPrepHours] = useState('-')
    const [cookingMins, setCookingMins] = useState('-')
    const [cookingHours, setCookingHours] = useState('-')
    const [servingsValue, setServingsValue] = useState('-')

    return (
        <>
            <View style={styles().titleContainer}>
                <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
                    <Text style={styles().title}>Prep Time</Text>
                    <TouchableOpacity
                        style={styles().inputContainer}
                        onPress={() => {
                            setPrepTimeModal(true)
                        }}>
                        <Text style={styles().inputText}>{prepHours} {prepMins}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
                    <Text style={styles().title}>Cooking Time</Text>
                    <TouchableOpacity
                        style={styles().inputContainer}
                        onPress={() => {
                            setCookingTimeModal(true)
                        }}>
                        <Text style={styles().inputText}>{cookingHours} {cookingMins}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
                    <Text style={styles().title}>Servings</Text>
                    <TouchableOpacity
                        style={styles().inputContainer}
                        onPress={() => {
                            setServingsModal(true)
                        }}>
                        <Text style={styles().inputText}>{servingsValue}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Prep Time Modal */}
            <Modal
                isVisible={prepTimeModalActive}
                onBackButtonPress={() => setPrepTimeModal(false)}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => setPrepTimeModal(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                useNativeDriver
                hideModalContentWhileAnimating>
                <View style={styles().modalPickerContainer}>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalCloseButton}
                            onPress={() => setPrepTimeModal(false)}
                            hitSlop={10}>
                        </Pressable>
                    </View>
                    <Text style={styles().modalTitle}>Prep Time</Text>
                    <Text style={styles().modalDesc}>How long does it take to get everything in order before you start cooking?</Text>
                    <View style={styles().pickersContainer}>
                        <Picker
                            style={{ backgroundColor: '#00000000', width: 50 }}
                            selectedValue={prepHours.length < 2 ? prepHours : prepHours.match(/\d/g).join("")}
                            pickerData={[...Array(24).keys()]}
                            onValueChange={value => value > 1 ? setPrepHours(value.toString() + 'hrs') : setPrepHours(value.toString() + 'hr')} />
                        <View style={styles('hours').modalLabelContainer}>
                            <Text style={styles().modalLabel}>hours</Text>
                        </View>
                        <Picker
                            style={{ backgroundColor: '#00000000', width: 50 }}
                            selectedValue={prepMins.length < 2 ? prepMins : prepMins.match(/\d/g).join("")}
                            pickerData={[...Array(60).keys()]}
                            onValueChange={value => value > 1 ? setPrepMins(value.toString() + 'mins') : setPrepMins(value.toString() + 'min')} />
                        <View style={styles('mins').modalLabelContainer}>
                            <Text style={styles().modalLabel}>mins</Text>
                        </View>
                    </View>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalSaveButton}
                            onPress={() => setPrepTimeModal(false)}
                            hitSlop={10}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Cooking Time Modal */}
            <Modal
                isVisible={cookingTimeModalActive}
                onBackButtonPress={() => setCookingTimeModal(false)}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => setCookingTimeModal(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                useNativeDriver
                hideModalContentWhileAnimating>
                <View style={styles().modalPickerContainer}>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalCloseButton}
                            onPress={() => setCookingTimeModal(false)}
                            hitSlop={10}>
                        </Pressable>
                    </View>
                    <Text style={styles().modalTitle}>Cooking Time</Text>
                    <Text style={styles().modalDesc}>How long does it take to cook the entire meal?</Text>
                    <View style={styles().pickersContainer}>
                        <Picker
                            style={{ backgroundColor: '#00000000', width: 50 }}
                            selectedValue={cookingHours.length < 2 ? cookingHours : cookingHours.match(/\d/g).join("")}
                            pickerData={[...Array(24).keys()]}
                            onValueChange={value => {
                                if (value > 1) {
                                    setCookingHours(value.toString() + 'hrs')
                                } else {
                                    setCookingHours(value.toString() + 'hr')
                                }
                            }} />
                        <View style={styles('hours').modalLabelContainer}>
                            <Text style={styles().modalLabel}>hours</Text>
                        </View>
                        <Picker
                            style={{ backgroundColor: '#00000000', width: 50 }}
                            selectedValue={cookingMins.length < 2 ? cookingMins : cookingMins.match(/\d/g).join("")}
                            pickerData={[...Array(60).keys()]}
                            onValueChange={value => {
                                if (value > 1) {
                                    setCookingMins(value.toString() + 'mins')
                                } else {
                                    setCookingMins(value.toString() + 'min')
                                }
                            }} />
                        <View style={styles('mins').modalLabelContainer}>
                            <Text style={styles().modalLabel}>mins</Text>
                        </View>
                    </View>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalSaveButton}
                            onPress={() => setCookingTimeModal(false)}
                            hitSlop={10}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Servings Modal */}
            <Modal
                isVisible={servingsModalActive}
                onBackButtonPress={() => setServingsModal(false)}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => setServingsModal(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                useNativeDriver
                hideModalContentWhileAnimating>
                <View style={styles().modalPickerContainer}>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalCloseButton}
                            onPress={() => setServingsModal(false)}
                            hitSlop={10}>
                        </Pressable>
                    </View>
                    <Text style={styles().modalTitle}>Servings</Text>
                    <Text style={styles().modalDesc}>How many people does the meal serve?</Text>
                    <View style={styles().pickersContainer}>
                        <Picker
                            style={{ backgroundColor: '#00000000', width: 50 }}
                            selectedValue={servingsValue}
                            pickerData={[...Array(21).keys()]}
                            onValueChange={value => value >1? setServingsValue(value.toString() + ' people'): setServingsValue(value.toString() + ' person')} />
                        <View style={styles('servings').modalLabelContainer}>
                            <Text style={styles().modalLabel}>servings</Text>
                        </View>
                    </View>
                    <View style={styles().modalSection}>
                        <Pressable
                            style={styles().modalSaveButton}
                            onPress={() => setServingsModal(false)}
                            hitSlop={10}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
};

const styles = (label) => StyleSheet.create({
    mainContainer: {
        width: '100%',
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 13
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#2B303C',
        backgroundColor: '#121212',
        height: 45,
        width: '100%',
        borderRadius: 6,
        marginVertical: 12,
        justifyContent: 'center'
    },
    inputText: {
        fontSize: 14,
        color: '#E84A4A',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    modalSection: {
        alignItems: 'center',
        paddingVertical: 20
    },
    modalPickerContainer: {
        width: '100%',
        backgroundColor: '#121212',
        /*        alignItems: 'center', */
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        color: '#ffffff'
    },
    modalDesc: {
        fontSize: 12,
        color: '#ffffff50',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    modalCloseButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 5,
        width: 50,
        marginVertical: 10,
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalLabelContainer: {
        width: label == 'mins' ? 50 : 75,
        justifyContent: 'center',
    },
    modalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        borderColor: '#ffffff10',
        backgroundColor: '#8080801A',
        borderTopWidth: 1.1,
        borderBottomWidth: 1.1,
        paddingVertical: 4,
    },
    modalSaveButton: {
        width: '50%',
        height: 35,
        borderRadius: 20,
        backgroundColor: '#E32828',
        justifyContent: 'center'
    }
});

export default RecipeTiming;