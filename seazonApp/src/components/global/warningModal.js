import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

const WarningModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      transparent
      animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={{ padding: 20 }}>
            <Text style={styles.modalTitle}>{props.Title}</Text>
            <Text style={styles.modalDesc}>{props.Desc}</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => props.setVisible(false)}>
                <Text style={{ fontSize: 12, color: '#ffffff80', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={() => props.confirmFunction()}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    backgroundColor: '#121212',
    borderTopColor: 'red',
    borderTopWidth: 2
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalDesc: {
    fontSize: 12,
    paddingTop: 10,
    lineHeight: 25
  },
  modalConfirm: {
    height: 35,
    width: 100,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCancel: {
    height: 35,
    width: 100,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff50'
  }
});

export default WarningModal;

