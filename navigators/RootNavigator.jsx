import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ForgetPassword,
  Home,
  Login,
  SignUp,
  UserProfile,
  Users,
} from "../screens";
import { CustomDrawer } from "../components";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const InitialRoute = localStorage.getItem("route");

const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={InitialRoute}
    >
      <Drawer.Screen
        name="SIGNUP"
        options={{ title: "Sign up" }}
        component={SignUp}
      />
      <Drawer.Screen
        name="LOGIN"
        options={{ title: "Sign in" }}
        component={Login}
      />
      <Drawer.Screen
        name="USERS"
        options={{ title: "Sign users" }}
        component={Users}
      />
      <Drawer.Screen name="HOME" options={{ title: "Home" }} component={Home} />
      <Drawer.Screen
        name="PROFILE"
        options={{ title: "User Profile" }}
        component={UserProfile}
      />
      <Drawer.Screen
        options={{ title: "Forget Password" }}
        name="FORGET_PASSWORD"
        component={ForgetPassword}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
