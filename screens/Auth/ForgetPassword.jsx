import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BackBtn, Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import {
  colors,
  font_size,
  font_weight,
  icons,
  rounded,
  spacing_size,
} from "../../constants";

const ForgetPassword = () => {
  const { themeColors } = useTheme();
  const [errorShow, setErrorShow] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundLight },
      ]}
    >
      <View style={styles.backBtnBox}>
        <BackBtn route={"LOGIN"} />
      </View>
      <View style={styles.loginHead}>
        <Icon
          name="person"
          color={themeColors.icon}
          size={icons.EXTRA_LARGE_ICON}
        />
        <Text style={[styles.loginTitle, { color: themeColors.textPrimary }]}>
          Twittwer
        </Text>
      </View>
      <TextField
        placeholderText={"Email"}
        onChangeText={(text) => setEmail(text)}
      />
      {errorShow && (
        <Text style={styles.errorMsg}>Incorrect username or password</Text>
      )}
      <View style={styles.loginBtn}>
        <Button>
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Reset Password
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing_size.SPACING,
  },
  loginHead: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginTitle: {
    textTransform: "uppercase",
    marginVertical: spacing_size.SPACING_MEDIUM,
    fontSize: font_size.TEXT_TITLE,
    letterSpacing: spacing_size.LETTER_SPACING_DEFAULT,
  },
  backBtnBox: {
    position: "absolute",
    left: spacing_size.SPACING,
    top: spacing_size.SPACING_MEDIUM,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backBtn: {
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_CIRCLE,
  },
  loginBtn: {
    marginVertical: spacing_size.SPACING,
  },
  text: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
    textTransform: "uppercase",
  },
  errorMsg: {
    color: colors.ERROR_MSG,
    textAlign: "center",
    marginTop: spacing_size.SPACING_SMALL,
  },
});
