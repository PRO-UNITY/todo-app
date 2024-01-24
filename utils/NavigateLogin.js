import { useNavigation } from "@react-navigation/native";

export const navigateToLoginPage = () => {
  const navigation = useNavigation();
  return navigation.navigate("HOME");
};
