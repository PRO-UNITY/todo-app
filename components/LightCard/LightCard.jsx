import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { font_size } from "../../constants/FontSize";
import { colors } from "../../constants/Colors";
import { spacing_size } from "../../constants/Spacing";
import { rounded } from "../../constants/Corners";

const LightCard = ({ comment, user }) => {
  const { themeColors } = useTheme();
  return (
    <SafeAreaView>
      <View
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
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    padding: spacing_size.SPACING_SMALL,
    marginVertical: spacing_size.LETTER_SPACING_DEFAULT,
    borderRadius: rounded.ROUNDED_MD,
  },
  cardTitle: {
    fontSize: font_size.TEXT_SUBTITLE,
  },
  subtitle: {
    color: colors.LIGHT_THIRDSTY,
    fontSize: font_size.TEXT_DESCRIPTION,
  },
});
export default LightCard;
