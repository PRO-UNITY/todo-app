import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { font_size } from "../../constants/FontSize";
import { spacing_size } from "../../constants/Spacing";

const ForgetPassword = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [errorShow, setErrorShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    console.log(email);
  };
  const handleBack = () => {
    navigation.navigate("LOGIN");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundLight },
      ]}
    >
      <Pressable
        style={[styles.backBtn, { backgroundColor: themeColors.bgWhite }]}
        onPress={handleBack}
      >
        <Icon
          name="arrow-back"
          color={themeColors.icon}
          size={icons.DEFAULT_ICON}
        />
      </Pressable>
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
        <Button btnFunc={handleLogin}>
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
    marginVertical: 30,
    fontSize: font_size.TEXT_TITLE,
    letterSpacing: 3,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    marginVertical: 25,
  },
  text: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  errorMsg: {
    color: "red",
    textAlign: "center",
    marginTop: 15,
  },
});
