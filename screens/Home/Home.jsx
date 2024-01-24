import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ActionCard, AddCommetCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { font_size } from "../../constants/FontSize";
import {
  GetActiveFavorite,
  GetCommentCard,
} from "../../services/Comment/Comment";
import { spacing_size } from "../../constants/Spacing";

const Home = () => {
  const navigation = useNavigation();
  const [commentCard, setCommentCard] = useState([]);
  const { themeColors } = useTheme();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const getTodoCard = () => {
    GetCommentCard().then((res) => setCommentCard(res));
  };
  useEffect(() => {
    getTodoCard();
    GetActiveFavorite().then((res) => console.log(res));
  }, []);
  console.log(commentCard);
  return (
    <ScrollView
      style={{
        backgroundColor: themeColors.bgWhite,
      }}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.heading,
            { backgroundColor: themeColors.backgroundLight },
          ]}
        >
          <View style={styles.headingTop}>
            <Pressable onPress={openDrawer}>
              <Icon
                name={"menu"}
                size={icons.MEDIUM_ICON}
                color={themeColors.icon}
              />
            </Pressable>
            <Text style={[styles.title, { color: themeColors.textPrimary }]}>
              The Wall
            </Text>
            <View />
          </View>

          <AddCommetCard getFunc={getTodoCard} />
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
    paddingHorizontal: spacing_size.SPACING,
  },
  headingTop: {
    paddingTop: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textTransform: "uppercase",
    fontSize: font_size.TEXT_TITLE,
    letterSpacing: 3,
  },
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: spacing_size.SPACING,
  },
  searchInput: {
    flex: 5,
  },
  searchBtn: {
    flex: 1,
  },
});

export default Home;
