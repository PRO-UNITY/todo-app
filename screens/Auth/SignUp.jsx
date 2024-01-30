import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextField } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { SignUpUser } from "../../services";
import { getUserData, userData } from "./User";
import {
  colors,
  font_size,
  font_weight,
  icons,
  rounded,
  spacing_size,
} from "../../constants";
import {
  validationInput,
  handleInputValidation,
  SaveStrageRoute,
  changeFiled,
} from "../../utils";

const SignUp = ({ navigation }) => {
  const { themeColors } = useTheme();
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [errorShow, setErrorShow] = useState(false);

  const handleInputChange = (field, value) => {
    getUserData(field, value);
    changeFiled(field);
  };

  const handleSignUp = () => {
    handleInputValidation(userData);
    setLoading(true);
    SignUpUser(userData)
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.access);
        navigation.navigate("HOME");
        setErrorShow(true)
        setLoading(false);
      })
      .catch(() => {
        setErrorShow(true);
        setLoading(false);
      });
  };

  useEffect(() => SaveStrageRoute(navigation), [focused]);

  return (
    <ScrollView style={{ backgroundColor: themeColors.backgroundLight }}>
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
            placeholderText={"FirstName"}
            onChangeText={(text) => handleInputChange("first_name", text)}
            error={validationInput.first_name}
          />
          <TextField
            placeholderText={"LastName"}
            onChangeText={(text) => handleInputChange("last_name", text)}
            error={validationInput.last_name}
          />
          <TextField
            placeholderText={"Email"}
            onChangeText={(text) => handleInputChange("email", text)}
            error={validationInput.email}
          />
          <TextField
            secureTextEntry
            placeholderText={"Password"}
            onChangeText={(text) => handleInputChange("password", text)}
            error={validationInput.password}
          />
          <TextField
            secureTextEntry
            placeholderText={"Confirm Password"}
            onChangeText={(text) => handleInputChange("confirm_password", text)}
            error={validationInput.confirm_password}
          />
        </View>
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
    </ScrollView>
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
