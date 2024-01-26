import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ActionCard, AddCommetCard } from "../../components";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { font_size } from "../../constants/FontSize";
import { GetCommentCard } from "../../services/Comment/Comment";
import { spacing_size } from "../../constants/Spacing";

const Home = () => {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [commentCard, setCommentCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { themeColors } = useTheme();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const getTodoCard = () => {
    setLoading(true);
    GetCommentCard(page)
      .then((res) =>
        setCommentCard((prevCommentCard) => [
          ...prevCommentCard,
          ...res?.results,
        ])
      )
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getTodoCard();
  }, [page]);
  console.log(commentCard);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    const currentRoute =
      navigation.getState().routeNames[navigation.getState().index];
    localStorage.setItem("route", currentRoute);
  }, [focused]);

  return (
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
        <AddCommetCard setCommentCard={setCommentCard} />
      </View>
      <FlatList
        style={{ padding: spacing_size.SPACING }}
        data={commentCard}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <ActionCard {...item} setCommentCard={setCommentCard} />
        )}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
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
    paddingTop: spacing_size.SPACING_LARGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textTransform: "uppercase",
    fontSize: font_size.TEXT_TITLE,
    letterSpacing: spacing_size.LETTER_SPACING_DEFAULT,
  },
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing_size.SPACING_SMALL,
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
