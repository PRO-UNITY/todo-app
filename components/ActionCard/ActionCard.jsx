import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import LightCard from "../LightCard/LightCard";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { colors } from "../../constants/Colors";
import { padding_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import CommentModal from "../CommentModal/CommentModal";
import {
  isActiveFavorite,
  isRemoveFavorite,
} from "../../services/Comment/Comment";

const ActionCard = ({ id, title, user, comment, favoriteCount, favorite }) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeColors } = useTheme();

  const handleActiveFavorite = () => {
    if (favorite) {
      isActiveFavorite({ todo: id, is_favorite: true }).then(async (res) => {
        console.log(res);
      });
    } else {
      isRemoveFavorite(id).then(async (res) => {
        console.log(res);
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.cardContainer, { borderColor: themeColors.cardBorder }]}
    >
      <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: themeColors.subtitle }]}>
        {user?.username}
      </Text>
      <CommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.cardBody}>
        {comment?.length > 0 &&
          comment.map((item, i) => (
            <LightCard {...item} key={i} setModalVisible={setModalVisible} />
          ))}
      </View>
      {isShowComment && <AddComment setIsShowComment={setIsShowComment} />}
      <View style={[styles.actionsContainer]}>
        <Pressable
          style={styles.actionsDetails}
          onPress={() => setIsShowComment((prev) => !prev)}
        >
          <Icon
            name="chatbox-ellipses"
            color={colors.DARK_THIRDSTY}
            size={icons.DEFAULT_ICON}
          />
          <Text style={{ color: colors.DARK_THIRDSTY }}>0</Text>
        </Pressable>
        <Pressable style={styles.actionsDetails} onPress={handleActiveFavorite}>
          <Icon
            name={`${favorite ? "heart" : "heart-outline"}`}
            color={`${favorite ? "red" : colors.DARK_THIRDSTY}`}
            size={icons.DEFAULT_ICON}
          />
          <Text style={{ color: colors.DARK_THIRDSTY }}>{favoriteCount}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    paddingVertical: padding_size.PADDING,
  },
  cardTitle: {
    fontWeight: "500",
    fontSize: font_size.TEXT_SUBTITLE,
  },
  subtitle: {
    fontSize: font_size.TEXT_DESCRIPTION,
    fontWeight: "400",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
    gap: 10,
  },
  cardBody: {
    marginTop: 20,
  },
  actionsDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    color: "red",
  },
});
export default ActionCard;
