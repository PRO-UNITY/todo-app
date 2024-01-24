import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { padding_size } from "../../constants/Spacing";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";

const LightCard = ({ comment, user, setModalVisible }) => {
  const { themeColors } = useTheme();
  return (
    <Pressable
      onPress={() => setModalVisible(true)}
      style={[
        styles.cardContainer,
        { backgroundColor: themeColors.backgroundLight },
      ]}
    >
      <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
        {comment}
      </Text>
      <Text style={[styles.subtitle, { color: themeColors.subtitle }]}>
        {user?.email}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    padding: padding_size.PADDING_SMALL,
    marginVertical: 3,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: font_size.TEXT_SUBTITLE,
  },
  subtitle: {
    color: colors.LIGHT_THIRDSTY,
    fontSize: font_size.TEXT_DESCRIPTION,
    fontWeight: "400",
  },
});
export default LightCard;
