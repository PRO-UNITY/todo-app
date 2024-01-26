import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { spacing_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import { font_weight } from "../../constants/FontWeight";
import { icons } from "../../constants/IconSizes";
import { colors } from "../../constants/Colors";
import { GetUsers } from "../../services/Auth/Auth";
import { rounded } from "../../constants/Corners";
import { border } from "../../constants/Border";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Users = ({ navigation }) => {
  const { themeColors } = useTheme();
  const navigationRoot = useNavigation();
  const focused = useIsFocused();
  const [user, setUser] = useState([]);
  const handleBack = () => {
    navigation.navigate("HOME");
  };

  useEffect(() => {
    GetUsers().then((res) => setUser(res?.results));
  }, []);

  // useEffect(() => {
  //   const currentRoute =
  //     navigationRoot.getState().routeNames[navigationRoot.getState().index];
  //   localStorage.setItem("route", currentRoute);
  // }, [focused]);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.heading,
          { backgroundColor: themeColors.backgroundLight },
        ]}
      >
        <View style={styles.backBtnBox}>
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
        </View>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Users
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: themeColors.bgWhite,
        }}
      >
        {user.map((item) => (
          <View
            key={item.id}
            style={[styles.userCard, { borderColor: themeColors.cardBorder }]}
          >
            <View style={styles.icon}>
              <Icon
                name="person"
                color={themeColors.icon}
                size={icons.DEFAULT_ICON}
              />
            </View>
            <Text style={[styles.email, { color: themeColors.textPrimary }]}>
              {item?.email}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    padding: spacing_size.SPACING,
  },
  title: {
    fontSize: font_size.TEXT_TITLE,
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: spacing_size.LETTER_SPACING_DEFAULT,
    fontWeight: font_weight.FONT_BOLD,
  },
  backBtnBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backBtn: {
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_CIRCLE,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing_size.SPACING,
    borderBottomWidth: border.BORDER_DEFAULT,
    padding: spacing_size.SPACING,
    gap: spacing_size.SPACING_SMALL,
  },
  icon: {
    padding: spacing_size.SPACING_SMALL,
    backgroundColor: colors.LIGHT_SECONDARY,
    borderRadius: rounded.ROUNDED_MD,
  },
  email: {
    fontSize: font_size.TEXT_SUBTITLE,
    fontWeight: font_weight.FONT_BOLD,
  },
});

export default Users;
