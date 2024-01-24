import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserCardsData } from "../../mock/data";
import { ActionCard } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { padding_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import { icons } from "../../constants/IconSizes";
import { colors } from "../../constants/Colors";

const UserProfile = ({ navigation }) => {
  const { themeColors } = useTheme();
  const handleBack = () => {
    navigation.navigate("HOME");
  };
  return (
    <ScrollView style={{ backgroundColor: themeColors.bgWhite }}>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.heading,
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
          <View style={styles.prifileDataBox}>
            <View
              style={[
                styles.profileImageBox,
                { backgroundColor: themeColors.userImageBox },
              ]}
            >
              <Icon
                name="person"
                size={icons.EXTRA_LARGE_ICON}
                color={colors.LIGHT_PRIMARY}
              />
            </View>
            <Text style={[styles.name, { color: themeColors.textPrimary }]}>
              Mitch
            </Text>
            <Text style={[styles.gmail, { color: themeColors.subtitle }]}>
              mitchkoko@gmail.com
            </Text>
          </View>
        </View>
        <View style={{ padding: padding_size.PADDING }}>
          {UserCardsData.map((item) => (
            <ActionCard {...item} key={item.id} />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    paddingTop: 50,
    paddingBottom: padding_size.PADDING,
    paddingHorizontal: padding_size.PADDING,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  prifileDataBox: {
    alignItems: "center",
  },
  profileImageBox: {
    padding: padding_size.PADDING,
    marginVertical: 15,
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
  },
  name: {
    fontWeight: "600",
    fontSize: font_size.TEXT_TITLE,
    marginVertical: 10,
  },
  gmail: {
    color: "#a2a2a2",
    fontSize: font_size.TEXT_DESCRIPTION,
  },
});

export default UserProfile;
