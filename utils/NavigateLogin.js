import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const NavigateLogin = () => {
  const navigate = useNavigation();
  useEffect(() => {
    navigate.navigate("LOGIN");
  }, []);
  return (
    <View>
      <Text>NavigateLogin</Text>
    </View>
  );
};

export default NavigateLogin;
