import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { padding_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";
import { SignInUser } from "../../services/Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [errorShow, setErrorShow] = useState(false);
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setSignInData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleLogin = () => {
    SignInUser(signInData)
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.token?.access);
        navigation.navigate("HOME");
      })
      .catch((err) => setErrorShow(true));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundLight },
      ]}
    >
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
        placeholderText={"Username"}
        onChangeText={(text) => handleInputChange("username", text)}
      />
      <TextField
        placeholderText={"Password"}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      <Pressable onPress={() => navigation.navigate("FORGET_PASSWORD")}>
        <Text style={[styles.forgetPass, { color: themeColors.textPrimary }]}>
          Forget Password?
        </Text>
      </Pressable>
      {errorShow && (
        <Text style={styles.errorMsg}>Incorrect username or password</Text>
      )}
      <View style={styles.loginBtn}>
        <Button btnFunc={handleLogin}>
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Login
          </Text>
        </Button>
      </View>
      <Pressable onPress={() => navigation.navigate("SIGNUP")}>
        <Text style={[styles.registerLink]}>
          Don't have an account?{" "}
          <Text style={[styles.textBold, { color: themeColors.textPrimary }]}>
            Register here
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: padding_size.PADDING,
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
  loginBtn: {
    marginVertical: 25,
  },
  image: {
    width: 70,
    height: 70,
  },
  forgetPass: {
    textAlign: "right",
    marginTop: 5,
    fontWeight: "500",
  },
  text: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  registerLink: {
    textAlign: "center",
    marginTop: 16,
    color: colors.LIGHT_FOURTY,
  },
  textBold: {
    fontWeight: "500",
  },
  errorMsg: {
    color: "red",
    textAlign: "center",
    marginTop: 15,
  },
});
