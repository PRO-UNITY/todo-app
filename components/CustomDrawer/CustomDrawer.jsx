import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import { padding_size } from "../../constants/Spacing";
import { icons } from "../../constants/IconSizes";

const CustomDrawer = () => {
  const { themeColors, toggleTheme } = useTheme();
  const navigate = useNavigation();
  const handleNavigate = (path) => {
    navigate.navigate(path);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundLight },
      ]}
    >
      <View style={styles.heading}>
        <Pressable onPress={toggleTheme}>
          <Icon name="heart" color={themeColors.icon} size={30} />
        </Pressable>
      </View>
      <DrawerContentScrollView>
        <Pressable
          style={styles.routeContent}
          onPress={() => handleNavigate("HOME")}
        >
          <Icon
            name="home"
            color={themeColors.icon}
            size={icons.DEFAULT_ICON}
          />
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={styles.routeContent}
          onPress={() => handleNavigate("PROFILE")}
        >
          <Icon
            name="person"
            color={themeColors.icon}
            size={icons.DEFAULT_ICON}
          />
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Profile
          </Text>
        </Pressable>
        <Pressable
          style={styles.routeContent}
          onPress={() => handleNavigate("USERS")}
        >
          <Icon
            name="people"
            color={themeColors.icon}
            size={icons.DEFAULT_ICON}
          />
          <Text style={[styles.text, { color: themeColors.textPrimary }]}>
            Users
          </Text>
        </Pressable>
      </DrawerContentScrollView>
      <Pressable
        style={styles.routeContent}
        onPress={() => handleNavigate("LOGIN")}
      >
        <Icon name="log-out-outline" color={themeColors.icon} size={25} />
        <Text style={[styles.text, { color: themeColors.textPrimary }]}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: padding_size.PADDING,
  },
  heading: {
    paddingTop: 80,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  routeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: padding_size.PADDING,
  },
  text: {
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default CustomDrawer;
