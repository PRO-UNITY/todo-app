import { View, Modal, Pressable, StyleSheet, Text } from "react-native";
import { spacing_size } from "../../constants/Spacing";
import { colors } from "../../constants/Colors";
import { font_size } from "../../constants/FontSize";
import { useTheme } from "../../context/ThemeContext";
import { font_weight } from "../../constants/FontWeight";
import { border } from "../../constants/Border";
import { rounded } from "../../constants/Corners";

const CommentModal = ({
  modalVisible,
  setModalVisible,
  comment,
  title,
  user,
}) => {
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{user?.username}</Text>
            {comment.length > 0 ? (
              comment?.map((item) => (
                <View
                  style={[
                    styles.commentsCard,
                    { borderColor: themeColors.backgroundLight },
                  ]}
                  key={item?.id}
                >
                  <Text>{item?.comment?.user?.username}</Text>
                  <Text
                    style={[
                      styles.commentText,
                      { color: themeColors.subtitle },
                    ]}
                  >
                    {item?.comment}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.warningMsg}>No commnet yet...</Text>
            )}
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
    marginTop: spacing_size.SPACING_LARGE,
  },
  title: {
    fontSize: font_size.TEXT_TITLE,
    marginTop: spacing_size.SPACING_MEDIUM,
    fontWeight: font_weight.FONT_BOLD,
    textAlign: "center",
  },
  author: {
    textAlign: "center",
    marginBottom: spacing_size.SPACING,
  },
  modalView: {
    flex: 0.75,
    backgroundColor: "white",
    borderRadius: rounded.ROUNDED_MD,
    paddingVertical: spacing_size.SPACING,
    borderColor: colors.DARK_FOURTY,
    borderWidth: border.BORDER_DEFAULT,
    padding: spacing_size.SPACING,
  },
  commentsCard: {
    borderWidth: border.BORDER_DEFAULT,
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_SM,
  },
  commentText: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
  },
  modalText: {
    marginBottom: spacing_size.SPACING_SMALL,
    textAlign: "center",
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
  },
  warningMsg: {
    textAlign: "center",
  },
});

export default CommentModal;
