import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import HomePanel from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import AccScreen from "./components/AccScreen";
import ProfileInputScreen from "./components/ProfileInputScreen";
import CameraScanScreen from "./components/CameraScanScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen({ usr_info }) {
  // console.log("The props val: " + usr_info)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            return <FeatherIcon name="home" size={size} color={color} />;
          } else if (route.name === "Account") {
            iconName = focused ? "account-outline" : "account-outline";
            return (
              <MaterialCommunityIconsIcon
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePanel}
        options={{ title: "Home Screen" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Screen" }}
      />
      <Tab.Screen
        name="Account"
        component={AccScreen}
        options={{ title: "Account Screen" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabScreen}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="ProfileInputScreen"
          component={ProfileInputScreen}
          options={{ title: "Allergy Input" }}
        />
        <Stack.Screen
          name="CameraScanScreen"
          component={CameraScanScreen}
          options={{ title: "Camera Scanning" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
