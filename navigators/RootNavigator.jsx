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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const InitialRoute = AsyncStorage.getItem("route").then();
  const [initialRoute, setinitialRoute] = useState(null);

  InitialRoute.then((res) => setinitialRoute(res));
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"LOGIN"}
    >
      <Drawer.Screen
        name="LOGIN"
        options={{ title: "Sign in" }}
        component={Login}
      />
      <Drawer.Screen
        name="SIGNUP"
        options={{ title: "Sign up" }}
        component={SignUp}
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
