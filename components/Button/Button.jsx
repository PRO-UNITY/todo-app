import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { rounded, spacing_size } from "../../constants";

const Button = ({ children, btnFunc }) => {
  const { themeColors } = useTheme();
  return (
    <Pressable
      style={[styles.button, { backgroundColor: themeColors.bgWhite }]}
      onPress={btnFunc}
    >
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_SM,
  },
});
