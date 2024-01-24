import { View, Modal, Pressable, StyleSheet } from "react-native";
import { spacing_size } from "../../constants/Spacing";
import { colors } from "../../constants/Colors";
import { font_size } from "../../constants/FontSize";
import { useTheme } from "../../context/ThemeContext";

const CommentModal = ({ modalVisible, setModalVisible, comment }) => {
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
            {/* {comment?.map((item) => (
              <LightCard
                comment={""}
                key={item?.id}
                style={[styles.modalText, { color: themeColors.textPrimary }]}
              >
                Hello World!
              </LightCard>
            ))} */}
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
    flex: 0.5,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: spacing_size.SPACING,
    alignItems: "center",
    borderColor: colors.DARK_FOURTY,
    borderWidth: 1,
    elevation: 6,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: "500",
  },
});

export default CommentModal;
