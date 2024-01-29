import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveStrageRoute = (navigation) => {
  if (navigation) return;
  const currentRoute = navigation.getState().routeNames[navigation?.getState().index];
  AsyncStorage.setItem("route", currentRoute);
};
