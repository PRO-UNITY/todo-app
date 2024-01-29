import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { icons, rounded, spacing_size } from "../../constants";

const BackBtn = ({ route }) => {
  const { themeColors } = useTheme();
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.backBtnBox}>
      <Pressable
        style={[styles.backBtn, { backgroundColor: themeColors.bgWhite }]}
        onPress={handleBack}
      >
        <Icon
          name="arrow-back"
          color={themeColors.icon}
          size={icons.DEFAULT_ICON}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  backBtnBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backBtn: {
    padding: spacing_size.SPACING_SMALL,
    borderRadius: rounded.ROUNDED_CIRCLE,
  },
});

export default BackBtn;
