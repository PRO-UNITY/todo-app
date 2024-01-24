import { View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../constants/Colors";
import { icons } from "../../constants/IconSizes";
import { useTheme } from "../../context/ThemeContext";
import { spacing_size } from "../../constants/Spacing";
import { rounded } from "../../constants/Corners";
import { border } from "../../constants/Border";

const AddComment = ({ getCommnetData, handleAddComment, commentData }) => {
  const { themeColors } = useTheme();

  return (
    <View style={styles.commentBox}>
      <TextInput
        value={commentData?.comment}
        style={styles.input}
        placeholderTextColor={colors.LIGHT_FOURTY}
        placeholder={"Add comment..."}
        onChangeText={(text) => getCommnetData(text)}
      />
      <Pressable
        style={[
          styles.addBtn,
          { backgroundColor: themeColors.backgroundLight },
        ]}
        onPress={handleAddComment}
      >
        <MaterialCommunityIcons
          name="check"
          color={colors.LIGHT_PRIMARY}
          size={icons.DEFAULT_ICON}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing_size.SPACING_SMALL,
  },
  input: {
    padding: spacing_size.SPACING_SMALL,
    borderBottomWidth: border.BORDER_DEFAULT,
    borderColor: colors.LIGHT_FOURTY,
    flex: 6,
  },
  addBtn: {
    padding: spacing_size.SPACING_SMALL,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rounded.ROUNDED_SM,
    flex: 1,
  },
});

export default AddComment;
