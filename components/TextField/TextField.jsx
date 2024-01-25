import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "../../constants/Colors";
import { spacing_size } from "../../constants/Spacing";
import { rounded } from "../../constants/Corners";
import { border } from "../../constants/Border";

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
            outline: border.BORDER_NONE,
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
