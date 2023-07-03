import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-bottomsheet-reanimated';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const EditAndDeleteModal = (props) => {

  const bottomSheetRef = props.bottomSheetRef;
  const confirmDeleteRef = props.confirmDeleteRef

  const ModalOption = (modalProps) => {
    return (
      <TouchableOpacity
        onPress={modalProps.function}
        style={[
          styles.modalOption,
          {
            backgroundColor: modalProps.text == 'Delete' ? '#800000' : '',
            borderWidth: modalProps.text == 'Delete' ? 0 : 0.5
          }
        ]}>
        <MaterialCommunityIcons
          name={modalProps.icon}
          color={'#ffffff'}
          size={22.5}
          style={{ marginLeft: '7.5%', position: 'absolute' }} />
        <Text style={styles.text}>
          {modalProps.text}
        </Text>
      </TouchableOpacity>
    )
  };

  const Body = () => {
    return (
      <View style={styles.body}>
        <ModalOption text={'Edit'} icon={'file-document-edit'} function={props.editFunction} />
        <ModalOption text={'Delete'} icon={'delete'} function={() => {
          confirmDeleteRef.current?.snapTo(1)
          bottomSheetRef.current?.snapTo(0)
        }} />
      </View>
    )
  };

  const ConfirmDelete = () => {
    return (
      <View style={styles.body}>
        <Text style={{ fontFamily: 'Poppins' }} >{props.deletePrompt ? props.deletePrompt : 'Are you sure you want to delete?'}</Text>
        <ModalOption text={'Yes'} function={props.deleteFunction} />
        <ModalOption text={'No'} function={() => confirmDeleteRef.current?.snapTo(0)} />
      </View>
    )
  };

  return (
    <>
      {/* Edit/Delete modal */}
      <BottomSheet
        //bottomSheerColor="#121212"
        ref={bottomSheetRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['0%', 230]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        bounce={false}
        // backDropColor="red"
        // isModal
        containerStyle={{ backgroundColor: "#151515" }}
        tipStyle={{ backgroundColor: "white" }}
        // headerStyle
        bodyStyle={{ flex: 1 }}
        header={null}
        body={<Body />} />

      {/* Delete confirm modal */}
      <BottomSheet
        //bottomSheerColor="#121212"
        ref={confirmDeleteRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['0%', 250]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        bounce={false}
        // backDropColor="red"
        // isModal
        containerStyle={{ backgroundColor: "#151515" }}
        tipStyle={{ backgroundColor: "white" }}
        // headerStyle
        bodyStyle={{ flex: 1 }}
        header={null}
        body={<ConfirmDelete />} />
    </>
  )
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center'
  },
  modalOption: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderRadius: 25,
    marginVertical: 7.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 13,
    textAlign: 'center',
    flex: 1
  }
});

export default EditAndDeleteModal;