import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { padding_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignUpUser } from "../../services/Auth/Auth";

const SignUp = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [errorShow, setErrorShow] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "bgfdfecdfwe",
    first_name: "wdffeefcewf",
    last_name: "wdffeffcwe",
    email: "fvefcewrd@gmail.com",
    password: "wqdeftbgfew",
    confirm_password: "wqdeftbgfew",
  });

  const handleInputChange = (field, value) => {
    setSignUpData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleSignUp = () => {
    SignUpUser(signUpData)
      .then(async (res) => {
        console.log(res);
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
        onChangeText={(text) => handleInputChange("password", text)}
      />
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
});
