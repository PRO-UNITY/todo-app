import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { colors, font_size, icons, spacing_size } from "../../constants";
import { GetCommentCard } from "../../services";
import { ActionCard, AddCommetCard } from "../../components";
import { SaveStrageRoute } from "../../utils";

const Home = ({ navigation }) => {
  const focused = useIsFocused();
  const { themeColors } = useTheme();
  const [commentCard, setCommentCard] = useState([]);
  const [page, setPage] = useState(1);
  const [realoadData, setRealoadData] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDrawer = () => navigation.openDrawer();

  const getData = () => {
    setLoading(true);
    GetCommentCard(page)
      .then((res) => {
        setCommentCard(res.results);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  const onTopReached = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getData();
    }
  };
  const onBottomReached = () => {
    if (!error) {
      setPage((prev) => prev + 1);
      getData();
    }
  };
  useEffect(() => {
    getData();
    SaveStrageRoute(navigation);
  }, [realoadData, focused]);

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
        <AddCommetCard setRealoadData={setRealoadData} />
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            <ActivityIndicator
              size={icons.EXTRA_LARGE_ICON}
              color={colors.DARK_THIRDSTY}
            />
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ padding: spacing_size.SPACING }}
          data={commentCard}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <ActionCard {...item} setRealoadData={setRealoadData} />
          )}
          onStartReached={onTopReached}
          onEndReached={onBottomReached}
          onEndReachedThreshold={0.1}
        />
      )}
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
