import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import {
  colors,
  font_size,
  font_weight,
  icons,
  rounded,
  spacing_size,
} from "../../constants";
import { SaveStrageRoute } from "../../utils";
import { GetCommentCard, GetUser } from "../../services";
import { ActionCard, BackBtn } from "../../components";

const UserProfile = ({ navigation }) => {
  const { themeColors } = useTheme();
  const focused = useIsFocused();
  const [page, setPage] = useState(1);
  const [realoadData, setRealoadData] = useState(false);
  const [user, setUser] = useState(null);
  const [commentCard, setCommentCard] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    GetCommentCard(page)
      .then((res) => {
        setCommentCard(res.results);
        setPageCount(Math.floor(res.count / 10) + 1);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  const onTopReached = () => {
    if (page > 1 && !loading) {
      setPage((prev) => prev - 1);
    }
  };

  const onBottomReached = () => {
    if (page < pageCount && !loading) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    getData();
    SaveStrageRoute(navigation);
    GetUser().then((res) => setUser(res));
  }, [realoadData, focused]);

  useEffect(() => SaveStrageRoute(navigation), [focused]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.bgWhite }]}
    >
      <View
        style={[
          styles.heading,
          { backgroundColor: themeColors.backgroundLight },
        ]}
      >
        <BackBtn route={"HOME"} />
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
    </SafeAreaView>
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
