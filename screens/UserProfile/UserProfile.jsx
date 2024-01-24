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

const UserProfile = ({ navigation }) => {
  const { themeColors } = useTheme();
  const [commentCard, setCommentCard] = useState([]);
  const [user, setUser] = useState(null);

  const getTodoCard = () => {
    GetCommentCard().then((res) => setCommentCard(res));
  };

  useEffect(() => {
    getTodoCard();
    GetActiveFavorite().then((res) => setUser(res));
  }, []);
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
    paddingTop: 50,
    paddingBottom: spacing_size.SPACING,
    paddingHorizontal: spacing_size.SPACING,
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
    padding: spacing_size.SPACING,
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
