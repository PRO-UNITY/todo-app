import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import {
  border,
  colors,
  font_size,
  font_weight,
  icons,
  rounded,
  spacing_size,
} from "../../constants";
import { GetUsers } from "../../services";
import { SaveStrageRoute } from "../../utils";
import { BackBtn } from "../../components";

const Users = ({ navigation }) => {
  const { themeColors } = useTheme();
  const focused = useIsFocused();
  const [user, setUser] = useState([]);

  useEffect(() => {
    GetUsers().then((res) => setUser(res?.results)),
      SaveStrageRoute(navigation);
  }, [focused]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.heading,
          { backgroundColor: themeColors.backgroundLight },
        ]}
      >
        <BackBtn route={"HOME"} />
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Users
        </Text>
      </View>
      <ScrollView style={{ backgroundColor: themeColors.bgWhite }}>
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
