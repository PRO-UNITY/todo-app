import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../constants/Colors";
import { padding_size } from "../../constants/Spacing";
import { icons } from "../../constants/IconSizes";
import { useTheme } from "../../context/ThemeContext";

const AddComment = ({ setIsShowComment }) => {
  const { themeColors } = useTheme();
  const handleAddComment = () => {
    setIsShowComment(false);
  };
  return (
    <View style={styles.commentBox}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.LIGHT_FOURTY}
        placeholder={"Add comment..."}
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
    paddingHorizontal: padding_size.PADDING_SMALL,
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
