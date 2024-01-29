import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { border, colors, rounded, spacing_size } from "../../constants";

const TextField = ({
  placeholderText,
  onChangeText,
  inputValue,
  secureTextEntry,
  error,
}) => {
  const { themeColors } = useTheme();
  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            borderColor: error ? colors.ERROR_MSG : themeColors.inputBorder,
          },
        ]}
        placeholderTextColor={colors.LIGHT_FOURTY}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={inputValue}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    paddingVertical: spacing_size.SPACING_SMALL,
    borderWidth: border.BORDER_DEFAULT,
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_MD,
  },
});
