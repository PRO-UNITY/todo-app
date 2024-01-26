import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import RootNavigator from "./navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  // const userToken = AsyncStorage.getItem("token")
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
