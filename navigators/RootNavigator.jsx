import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Favorites,
  ForgetPassword,
  Home,
  Login,
  SignUp,
  UserProfile,
} from "../screens";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomDrawer } from "../components";

const Drawer = createDrawerNavigator();
const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HOME" component={Home} />
      <Drawer.Screen name="SIGNUP" component={SignUp} />
      <Drawer.Screen name="LOGIN" component={Login} />
      <Drawer.Screen name="PROFILE" component={UserProfile} />
      <Drawer.Screen name="FORGET_PASSWORD" component={ForgetPassword} />
      <Drawer.Screen name="FAVORITES" component={Favorites} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
