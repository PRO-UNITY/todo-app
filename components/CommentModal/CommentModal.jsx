import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { padding_size } from "../../constants/Spacing";
import { colors } from "../../constants/Colors";
import { font_size } from "../../constants/FontSize";
import { useTheme } from "../../context/ThemeContext";

const CommentModal = ({ modalVisible, setModalVisible }) => {
  const { themeColors } = useTheme();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text
              style={[styles.modalText, { color: themeColors.textPrimary }]}
            >
              Hello World!
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 50,
  },
  modalView: {
    flex: 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: padding_size.PADDING,
    alignItems: "center",
    borderColor: colors.DARK_FOURTY,
    borderWidth: 1,
    elevation: 6,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: font_size.TEXT_TITLE,
    fontWeight: "500",
  },
});

export default CommentModal;
