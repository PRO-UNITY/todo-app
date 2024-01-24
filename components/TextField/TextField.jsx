import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "../../constants/Colors";
import { padding_size } from "../../constants/Spacing";

const TextField = ({ placeholderText, onChangeText }) => {
  const { themeColors } = useTheme();
  return (
    <View>
      <TextInput
        style={[styles.input, { borderColor: themeColors.inputBorder }]}
        placeholderTextColor={colors.LIGHT_FOURTY}
        placeholder={placeholderText}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 5,
    borderWidth: 1,
    padding: padding_size.PADDING_SMALL,
    borderRadius: 10,
  },
});
