import { Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";
import { spacing_size } from "../../constants/Spacing";

const LightCard = ({ comment, user }) => {
  const { themeColors } = useTheme();
  return (
    <SafeAreaView
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    padding: spacing_size.SPACING_SMALL,
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
