import React, { useState } from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CreateTodoCard } from "../../services/CreateTodo/CreateTodo";
import { colors, icons, rounded, spacing_size } from "../../constants";
import TextField from "../TextField/TextField";

const AddCommnetCard = ({ setRealoadData }) => {
  const [todo, setTodo] = useState({ title: "" });
  const [loading, setloading] = useState(false);

  const CreateTodoHandle = () => {
    setloading(true);
    CreateTodoCard(todo)
      .then(async () => {
        setRealoadData((prev) => !prev);
        setTodo((prevData) => ({ ...prevData, title: "" }));
        setloading(false);
      })
      .catch(() => setloading(false));
  };

  return (
    <View style={styles.searchbar}>
      <View style={styles.searchInput}>
        <TextField
          inputValue={todo?.title}
          placeholderText={"Say something"}
          onChangeText={(text) =>
            setTodo((prevData) => ({ ...prevData, title: text }))
          }
        />
      </View>
      <View style={styles.searchBtn}>
        <Pressable style={styles.addBtn} onPress={CreateTodoHandle}>
          {loading ? (
            <ActivityIndicator color={colors.LIGHT_PRIMARY} />
          ) : (
            <MaterialCommunityIcons
              name="check"
              color={colors.LIGHT_SECONDARY}
              size={icons.DEFAULT_ICON}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing_size.SPACING_SMALL,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderRadius: rounded.ROUNDED_MD,
    paddingHorizontal: spacing_size.SPACING_SMALL,
    paddingVertical: spacing_size.LETTER_SPACING_DEFAULT,
    marginTop: spacing_size.SPACING_MEDIUM,
  },
  addBtn: {
    alignItems: "center",
    backgroundColor: "#86A7FC",
    color: colors.DARK_PRIMARY,
    paddingVertical: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_SM,
  },
  searchInput: {
    flex: 5,
    color: colors.TEXT_PRIMARY,
  },
  searchBtn: {
    flex: 1,
  },
});

export default AddCommnetCard;
