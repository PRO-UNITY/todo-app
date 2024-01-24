import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../constants/Colors";
import { icons } from "../../constants/IconSizes";
import { padding_size } from "../../constants/Spacing";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";

const AddCommnetCard = () => {
  const [cardData, setCardData] = useState("");

  return (
    <View style={styles.searchbar}>
      <View style={styles.searchInput}>
        <TextField
          placeholderText={"Say something"}
          onChangeText={(text) => setCardData(text)}
        />
      </View>
      <View style={styles.searchBtn}>
        <Button>
          <MaterialCommunityIcons
            name="check"
            color={colors.LIGHT_SECONDARY}
            size={icons.MEDIUM_ICON}
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
    gap: 10,
    paddingVertical: padding_size.PADDING,
  },
  searchInput: {
    flex: 5,
  },
  searchBtn: {
    flex: 1,
  },
});

export default AddCommnetCard;
