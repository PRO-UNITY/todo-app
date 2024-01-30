import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AddComment from "../AddComment/AddComment";
import {
  AddCommentTodo,
  DeleteComment,
  isActiveFavorite,
  isRemoveFavorite,
} from "../../services";
import {
  colors,
  font_size,
  font_weight,
  icons,
  rounded,
  spacing_size,
} from "../../constants";
import { Swipeable } from "react-native-gesture-handler";

const ActionCard = ({
  id,
  title,
  user,
  comment,
  favorite_count,
  comment_count,
  favorite,
  setRealoadData,
}) => {
  const [commentData, setcommentData] = useState({ todo: id, comment: "" });
  const [favoriteCount, setfavoriteCount] = useState(favorite_count);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isShowComments, setisShowComments] = useState(false);
  const [swipeableBg, setSwipeableBg] = useState(colors.BG_PRIMARY);
  const [loading, setloading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleActiveFavorite = () => {
    if (isFavorite) {
      isRemoveFavorite(id).then(async () => {
        setIsFavorite(false);
        setfavoriteCount((prev) => prev - 1);
        setRealoadData((prev) => !prev);
      });
    } else {
      isActiveFavorite({ todo: id, is_favorite: true }).then(async (res) => {
        setIsFavorite(true);
        setfavoriteCount((prev) => prev + 1);
        setRealoadData((prev) => !prev);
      });
    }
  };
  const getCommnetData = (text) => {
    setcommentData((prevData) => ({ ...prevData, comment: text }));
  };
  const handleAddComment = () => {
    setloading(true);
    AddCommentTodo(commentData)
      .then(async () => {
        setcommentData((prevData) => ({ ...prevData, comment: "" }));
        setRealoadData((prev) => !prev);
        setloading(false);
      })
      .catch(() => setloading(false));
  };
  const deleteTodo = () => {
    DeleteComment(id).then(async () => {
      setRealoadData((prev) => !prev);
    });
  };
  const RightSwipe = () => {
    return (
      <Pressable style={styles.delete} onPress={deleteTodo}>
        <Icon name="trash" color={colors.LIGHT_PRIMARY} size={20} />
      </Pressable>
    );
  };
  const LeftSwipe = () => {
    return (
      <Pressable style={styles.delete}>
        <Icon
          name="checkmark-done-circle"
          color={colors.LIGHT_PRIMARY}
          size={25}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.cardContainer,
        {
          marginVertical: spacing_size.LETTER_SPACING_DEFAULT,
          backgroundColor: swipeableBg,
        },
      ]}
    >
      <Swipeable
        onSwipeableLeftOpen={() => setIsDone((prev) => !prev)}
        onSwipeableClose={() => setSwipeableBg(colors.BG_PRIMARY)}
        renderRightActions={RightSwipe}
        renderLeftActions={LeftSwipe}
      >
        <View style={styles.cardHead}>
          <View style={{ alignItems: "flex-start" }}>
            {isDone && (
              <Icon
                size={icons.DEFAULT_ICON}
                color={"rgb(12, 226, 105)"}
                name="checkmark-circle"
              />
            )}
          </View>

          <Text style={styles.cardTitle}>{title}</Text>

          <View style={[styles.actionsContainer]}>
            <Pressable
              style={styles.actionsDetails}
              onPress={() => setisShowComments((prev) => !prev)}
            >
              <Icon
                name="chatbox-ellipses"
                color={colors.TEXT_PRIMARY}
                size={icons.DEFAULT_ICON}
              />
              <Text style={{ color: colors.DARK_THIRDSTY }}>
                {comment_count}
              </Text>
            </Pressable>
            <Pressable
              style={styles.actionsDetails}
              onPress={handleActiveFavorite}
            >
              <Icon
                name={`${isFavorite ? "heart" : "heart-outline"}`}
                color={`${isFavorite ? "red" : colors.DARK_THIRDSTY}`}
                size={icons.DEFAULT_ICON}
              />
              <Text style={{ color: colors.DARK_THIRDSTY }}>
                {favoriteCount}
              </Text>
            </Pressable>
          </View>
        </View>
      </Swipeable>
      {isShowComments && (
        <View style={styles.commnetsBox}>
          <AddComment
            getCommnetData={getCommnetData}
            handleAddComment={handleAddComment}
            commentData={commentData}
            title={title}
            user={user}
            loading={loading}
          />
          {comment.map((item) => (
            <Text key={item.id} style={styles.commentText}>
              {item?.comment}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
  },
  cardHead: {
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_MD,
  },
  delete: {
    justifyContent: "center",
    padding: spacing_size.SPACING_SMALL,
  },
  cardTitle: {
    fontWeight: font_weight.FONT_BOLD,
    fontSize: font_size.TEXT_SUBTITLE,
    color: colors.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: font_size.TEXT_DESCRIPTION,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing_size.SPACING_SMALL,
  },
  actionsDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing_size.LETTER_SPACING_DEFAULT,
    color: "red",
  },
  commnetsBox: {
    padding: spacing_size.SPACING_SMALL,
  },
  commentText: {
    color: colors.LIGHT_PRIMARY,
    paddingHorizontal: spacing_size.SPACING_SMALL,
    paddingVertical: spacing_size.LETTER_SPACING_DEFAULT,
  },
});
export default ActionCard;
