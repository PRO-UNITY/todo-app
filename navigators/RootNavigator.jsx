import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ForgetPassword,
  Home,
  Login,
  SignUp,
  UserProfile,
  Users,
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
      <Drawer.Screen name="SIGNUP" component={SignUp} />
      <Drawer.Screen name="LOGIN" component={Login} />
      <Drawer.Screen name="USERS" component={Users} />
      <Drawer.Screen name="HOME" component={Home} />
      <Drawer.Screen name="PROFILE" component={UserProfile} />
      <Drawer.Screen name="FORGET_PASSWORD" component={ForgetPassword} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
