import { View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../constants/Colors";
import { icons } from "../../constants/IconSizes";
import { useTheme } from "../../context/ThemeContext";
import { spacing_size } from "../../constants/Spacing";

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
    gap: 5,
  },
  input: {
    height: 37,
    marginVertical: 5,
    paddingHorizontal: spacing_size.SPACING_SMALL,
    borderWidth: 1,
    borderColor: colors.LIGHT_FOURTY,
    borderRadius: 8,
    flex: 5,
  },
  addBtn: {
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flex: 1,
  },
});

export default AddComment;
