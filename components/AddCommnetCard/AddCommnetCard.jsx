import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Button/Button";
import { CreateTodoCard } from "../../services/CreateTodo/CreateTodo";
import { colors, icons, spacing_size } from "../../constants";
import TextField from "../TextField/TextField";

const AddCommnetCard = ({ setRealoadData }) => {
  const [todo, setTodo] = useState({ title: "" });

  const CreateTodoHandle = () => {
    CreateTodoCard(todo)
      .then(async () => {
        setRealoadData((prev) => !prev);
        setTodo((prevData) => ({ ...prevData, title: "" }));
      })
      .catch((err) => console.log(err));
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
        <Button btnFunc={CreateTodoHandle}>
          <MaterialCommunityIcons
            name="check"
            color={colors.LIGHT_SECONDARY}
            size={icons.DEFAULT_ICON}
          />
        </Button>
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
    paddingVertical: spacing_size.SPACING,
  },
  searchInput: {
    flex: 5,
  },
  searchBtn: {
    flex: 1,
  },
});

export default AddCommnetCard;
