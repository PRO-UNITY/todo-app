import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  colors,
  font_size,
  font_weight,
  icons,
  spacing_size,
} from "../../constants";
import { SignInUser } from "../../services";
import {
  SaveStrageRoute,
  changeFiled,
  handleInputValidation,
  validationInput,
} from "../../utils";
import { getUserData, userData } from "./User";

const Login = ({ navigation }) => {
  const { themeColors } = useTheme();
  const focused = useIsFocused();
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    getUserData(field, value);
    changeFiled(field);
  };

  const handleLogin = () => {
    handleInputValidation(userData);
    setLoading(true);
    SignInUser({ username: userData.username, password: userData.password })
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.access);
        navigation.navigate("HOME");
        setErrorShow(false);
        setLoading(false);
      })
      .catch(() => {
        setErrorShow(true);
        setLoading(false);
      });
  };

  useEffect(() => SaveStrageRoute(navigation), [focused]);

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
      <View style={styles.inputBox}>
        <TextField
          placeholderText={"Username"}
          onChangeText={(text) => handleInputChange("username", text)}
          error={validationInput.username}
        />
        <TextField
          placeholderText={"Password"}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
          error={validationInput.password}
        />
      </View>
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
          {loading ? (
            <ActivityIndicator color={colors.DARK_THIRDSTY} />
          ) : (
            <Text style={[styles.text, { color: themeColors.textPrimary }]}>
              Login
            </Text>
          )}
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
  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: spacing_size.SPACING_SMALL,
    marginVertical: spacing_size.SPACING_SMALL,
  },
  loginBtn: {
    marginVertical: spacing_size.SPACING_MEDIUM,
  },
  forgetPass: {
    textAlign: "right",
    fontWeight: font_weight.FONT_BOLD,
  },
  text: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
    textTransform: "uppercase",
  },
  registerLink: {
    textAlign: "center",
    marginTop: spacing_size.SPACING,
    color: colors.LIGHT_FOURTY,
  },
  textBold: {
    fontWeight: font_weight.FONT_BOLD,
  },
  errorMsg: {
    color: colors.ERROR_MSG,
    textAlign: "center",
    marginTop: spacing_size.SPACING_SMALL,
  },
});
