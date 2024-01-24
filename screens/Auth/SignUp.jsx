import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignUpUser } from "../../services/Auth/Auth";
import { spacing_size } from "../../constants/Spacing";
import { font_weight } from "../../constants/FontWeight";

const SignUp = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [errorShow, setErrorShow] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (field, value) => {
    setSignUpData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleSignUp = () => {
    SignUpUser(signUpData)
      .then(async () => navigation.navigate("LOGIN"))
      .catch(() => setErrorShow(true));
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
        placeholderText={"FirstName"}
        onChangeText={(text) => handleInputChange("first_name", text)}
      />
      <TextField
        placeholderText={"LastName"}
        onChangeText={(text) => handleInputChange("last_name", text)}
      />
      <TextField
        placeholderText={"Email"}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <TextField
        placeholderText={"Password"}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      <TextField
        placeholderText={"Conifrm Password"}
        onChangeText={(text) => handleInputChange("confirm_password", text)}
      />
      {errorShow && (
        <Text style={styles.errorMsg}>Incorrect username or password</Text>
      )}
      <View style={styles.loginBtn}>
        <Button btnFunc={handleSignUp}>
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Sign Up
          </Text>
        </Button>
      </View>
      <Pressable onPress={() => navigation.navigate("LOGIN")}>
        <Text style={[styles.registerLink]}>
          Already have a account?{" "}
          <Text style={[styles.textBold, { color: themeColors.textPrimary }]}>
            Sign in
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

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
    marginVertical: spacing_size.SPACING,
    fontSize: font_size.TEXT_TITLE,
    letterSpacing: 3,
  },
  loginBtn: {
    marginVertical: spacing_size.SPACING,
  },
  text: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
    textTransform: "uppercase",
  },
  registerLink: {
    textAlign: "center",
    marginTop: spacing_size.SPACING_SMALL,
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
