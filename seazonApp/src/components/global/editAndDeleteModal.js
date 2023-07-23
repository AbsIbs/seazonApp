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
        style={styles.modalOption}>
        <MaterialCommunityIcons
          name={modalProps.icon}
          color={modalProps.icon == 'delete' ? '#800000' : '#ffffff'}
          size={25}
          style={{ paddingLeft: '10%' }} />
        <Text style={[
          styles.text,
          { color: modalProps.icon == 'delete' ? '#800000' : '#ffffff' }
        ]}>
          {modalProps.text}
        </Text>
      </TouchableOpacity>
    )
  };

  const Body = () => {
    return (
      <View>
        <ModalOption text={props.editText} icon={'file-document-edit'} function={props.editFunction} />
        <ModalOption text={props.deleteText} icon={'delete'} function={() => {
          confirmDeleteRef.current?.snapTo(1)
          bottomSheetRef.current?.snapTo(0)
        }} />
      </View>
    )
  };

  const ConfirmDelete = () => {
    return (
      <View>
        {/* <Text style={styles.subheading} >{props.deletePrompt ? props.deletePrompt : 'Are you sure you want to delete?'}</Text> */}
        <ModalOption icon={'delete'} text={'Confirm delete'} function={props.deleteFunction} />
        <ModalOption icon={'cancel'} text={'Cancel'} function={() => confirmDeleteRef.current?.snapTo(0)} />
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
        snapPoints={['0%', 175]}
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
        snapPoints={['0%', 175]}
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
    paddingLeft: '10%',
    fontWeight: '400',
    fontSize: 16,
    flex: 1
  },
  subheading: {
    fontFamily: 'Poppins', 
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  }
});

export default EditAndDeleteModal;