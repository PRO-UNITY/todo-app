import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import LightCard from "../LightCard/LightCard";
import { useTheme } from "../../context/ThemeContext";
import { icons } from "../../constants/IconSizes";
import { colors } from "../../constants/Colors";
import { font_size } from "../../constants/FontSize";
import CommentModal from "../CommentModal/CommentModal";
import {
  AddCommentTodo,
  isActiveFavorite,
  isRemoveFavorite,
} from "../../services/Comment/Comment";
import AddComment from "../AddComment/AddComment";
import { spacing_size } from "../../constants/Spacing";
import { font_weight } from "../../constants/FontWeight";
import { border } from "../../constants/Border";

const ActionCard = ({
  id,
  title,
  user,
  comment,
  favorite_count,
  comment_count,
  favorite,
  getFunc,
}) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentData, setcommentData] = useState({ todo: id, comment: "" });
  const { themeColors } = useTheme();
  const handleActiveFavorite = () => {
    if (favorite) {
      isRemoveFavorite(id).then(async (res) => {
        getFunc();
      });
    } else {
      isActiveFavorite({ todo: id, is_favorite: true }).then(async (res) => {
        getFunc();
      });
    }
  };
  const getCommnetData = (text) => {
    setcommentData((prevData) => ({ ...prevData, comment: text }));
  };
  const handleAddComment = () => {
    AddCommentTodo(commentData)
      .then(async (res) => {
        getFunc();
        setcommentData((prevData) => ({ ...prevData, comment: "" }));
        setIsShowComment(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView
      style={[styles.cardContainer, { borderColor: themeColors.cardBorder }]}
    >
      <Pressable onPress={() => setModalVisible((prev) => !prev)}>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.subtitle }]}>
          {user?.username}
        </Text>
        <View style={styles.cardBody}>
          {comment?.length > 0 &&
            comment.map((item, i) => <LightCard {...item} key={i} />)}
        </View>
      </Pressable>
      <CommentModal
        comment={comment}
        title={title}
        user={user}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isShowComment && (
        <AddComment
          getCommnetData={getCommnetData}
          handleAddComment={handleAddComment}
          commentData={commentData}
          title={title}
          user={user}
        />
      )}
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
          <Text style={{ color: colors.DARK_THIRDSTY }}>{comment_count}</Text>
        </Pressable>
        <Pressable style={styles.actionsDetails} onPress={handleActiveFavorite}>
          <Icon
            name={`${favorite ? "heart" : "heart-outline"}`}
            color={`${favorite ? "red" : colors.DARK_THIRDSTY}`}
            size={icons.DEFAULT_ICON}
          />
          <Text style={{ color: colors.DARK_THIRDSTY }}>{favorite_count}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: border.BORDER_DEFAULT,
    paddingVertical: spacing_size.SPACING,
  },
  cardTitle: {
    fontWeight: font_weight.FONT_BOLD,
    fontSize: font_size.TEXT_SUBTITLE,
  },
  subtitle: {
    fontSize: font_size.TEXT_DESCRIPTION,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: spacing_size.SPACING_SMALL,
    gap: spacing_size.SPACING_SMALL,
  },
  cardBody: {
    marginTop: spacing_size.SPACING_SMALL,
  },
  actionsDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing_size.SPACING_SMALL,
    color: "red",
  },
});
export default ActionCard;
