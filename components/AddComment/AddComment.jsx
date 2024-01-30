import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { border, colors, rounded, spacing_size } from "../../constants";

const AddComment = ({
  getCommnetData,
  handleAddComment,
  commentData,
  loading,
}) => {
  return (
    <View style={styles.commentBox}>
      <TextInput
        value={commentData?.comment}
        style={styles.input}
        placeholderTextColor={colors.LIGHT_PRIMARY}
        placeholder={"Add comment..."}
        onChangeText={(text) => getCommnetData(text)}
      />
      <Pressable style={styles.addBtn} onPress={handleAddComment}>
        {loading ? (
          <ActivityIndicator color={"#3468C0"} />
        ) : (
          <Text style={styles.addBtnText}>Add</Text>
        )}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing_size.SPACING_SMALL,
    borderBottomWidth: border.BORDER_DEFAULT,
    borderColor: colors.LIGHT_PRIMARY,
    marginVertical: spacing_size.LETTER_SPACING_DEFAULT,
    marginBottom: spacing_size.SPACING,
  },
  input: {
    padding: spacing_size.SPACING_SMALL,
    fontWeight: "600",
    color: colors.LIGHT_PRIMARY,
    flex: 1,
  },
  addBtn: {
    backgroundColor: colors.LIGHT_PRIMARY,
    paddingHorizontal: spacing_size.SPACING_SMALL,
    paddingVertical: spacing_size.LETTER_SPACING_DEFAULT,
    borderRadius: rounded.ROUNDED_SM,
  },
  addBtnText: {
    color: colors.TEXT_PRIMARY,
  },
});

export default AddComment;
