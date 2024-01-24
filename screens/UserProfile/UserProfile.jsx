import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ActionCard } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { font_size } from "../../constants/FontSize";
import { icons } from "../../constants/IconSizes";
import { colors } from "../../constants/Colors";
import {
  GetActiveFavorite,
  GetCommentCard,
} from "../../services/Comment/Comment";
import { spacing_size } from "../../constants/Spacing";
import { GetUser } from "../../services/Auth/Auth";
import { rounded } from "../../constants/Corners";
import { font_weight } from "../../constants/FontWeight";

const UserProfile = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [commentCard, setCommentCard] = useState([]);
  const [user, setUser] = useState(null);

  const getTodoCard = () => {
    GetCommentCard().then((res) => setCommentCard(res));
  };

  useEffect(() => {
    getTodoCard();
    GetUser().then((res) => setUser(res));
  }, []);
  console.log(user);
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
              {user?.username}
            </Text>
            <Text style={[styles.gmail, { color: themeColors.subtitle }]}>
              {user?.email}
            </Text>
          </View>
        </View>
        <View style={{ padding: spacing_size.SPACING }}>
          {commentCard.map((item) => (
            <ActionCard {...item} getFunc={getTodoCard} key={item.id} />
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
    paddingTop: spacing_size.SPACING_LARGE,
    paddingBottom: spacing_size.SPACING,
    paddingHorizontal: spacing_size.SPACING,
  },
  backBtnBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backBtn: {
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_CIRCLE,
  },
  prifileDataBox: {
    alignItems: "center",
  },
  profileImageBox: {
    padding: spacing_size.SPACING,
    marginVertical: spacing_size.SPACING,
    backgroundColor: "#EFEFEF",
    borderRadius: rounded.ROUNDED_MD,
  },
  name: {
    fontWeight: font_weight.FONT_BOLD,
    fontSize: font_size.TEXT_TITLE,
    marginVertical: spacing_size.SPACING_SMALL,
  },
  gmail: {
    color: "#a2a2a2",
    fontSize: font_size.TEXT_DESCRIPTION,
  },
});

export default UserProfile;
