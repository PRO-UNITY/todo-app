import React, { useEffect, useState } from "react";
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
import { rounded } from "../../constants/Corners";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const SignUp = ({ navigation }) => {
  const { themeColors } = useTheme();
  const navigationRoot = useNavigation();
  const [loading, setLoading] = useState(false);
  const focused = useIsFocused();
  const [errorShow, setErrorShow] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    username: false,
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    confirm_password: false,
  });

  const handleInputChange = (field, value) => {
    setSignUpData((prevData) => ({ ...prevData, [field]: value }));
    setInputErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };
  const handleSignUp = () => {
    const emptyFields = Object.keys(signUpData).filter(
      (field) => signUpData[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      const errors = {};
      emptyFields.forEach((field) => {
        errors[field] = true;
      });
      setInputErrors(errors);
      setErrorShow(true);
      return;
    }
    setLoading(true);
    SignUpUser(signUpData)
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.token?.access);
        navigation.navigate("HOME");
        setLoading(true);
      })
      .catch(() => {
        setErrorShow(true);
        setLoading(true);
      });
  };
  useEffect(() => {
    const currentRoute =
      navigationRoot.getState().routeNames[navigationRoot.getState().index];
    localStorage.setItem("route", currentRoute);
    console.log(currentRoute);
  }, [focused]);

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
      <form style={styles.inputBox}>
        <TextField
          placeholderText={"Username"}
          onChangeText={(text) => handleInputChange("username", text)}
          error={inputErrors.username}
        />
        <TextField
          placeholderText={"FirstName"}
          onChangeText={(text) => handleInputChange("first_name", text)}
          error={inputErrors.first_name}
        />
        <TextField
          placeholderText={"LastName"}
          onChangeText={(text) => handleInputChange("last_name", text)}
          error={inputErrors.last_name}
        />
        <TextField
          placeholderText={"Email"}
          onChangeText={(text) => handleInputChange("email", text)}
          error={inputErrors.email}
        />
        <TextField
          secureTextEntry
          placeholderText={"Password"}
          onChangeText={(text) => handleInputChange("password", text)}
          error={inputErrors.password}
        />
        <TextField
          secureTextEntry
          placeholderText={"Confirm Password"}
          onChangeText={(text) => handleInputChange("confirm_password", text)}
          error={inputErrors.confirm_password}
        />
      </form>
      {errorShow && (
        <Text style={styles.errorMsg}>
          Please fill in all the required fields
        </Text>
      )}
      <View style={styles.loginBtn}>
        <Button btnFunc={handleSignUp}>
          {loading ? (
            <ActivityIndicator color={colors.DARK_THIRDSTY} />
          ) : (
            <Text style={[styles.text, { color: themeColors.textPrimary }]}>
              Sign up
            </Text>
          )}
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
    letterSpacing: spacing_size.LETTER_SPACING_DEFAULT,
  },
  loginBtn: {
    marginVertical: spacing_size.SPACING,
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: spacing_size.LETTER_SPACING_DEFAULT,
    borderRadius: rounded.ROUNDED_MD,
  },
  inputBox: {
    gap: spacing_size.SPACING_SMALL,
    marginVertical: spacing_size.SPACING_SMALL,
    display: "flex",
    flexDirection: "column",
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
