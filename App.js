import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import AccScreen from "./components/AccScreen";

import AllergyProfile from "./components/AllergyProfileInput";
import CameraScanScreen from "./components/CameraScanScreen";
import AfterUPCscanned from "./components/AfterUPCscanned";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoginPage(props) {
  // init landing page for the Google Signin
  return (
    <View>
      <Text style={styles.header}>Sign In With Your Credentials</Text>
      <Button title="Sign in" onPress={() => props.signIn()} />
    </View>
  );
}

function TabScreens({ usr }) {
  // console.log("Tab Screen Called: " + usr);
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
        options={{ title: "Home Screen" }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Screen" }}
      />
      <Tab.Screen name="Account" options={{ title: "Account Screen" }}>
        {() => <AccScreen usr_info={usr} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrProfile: {
        signedIn: false,
        full_name: "",
        last_name: "",
        first_name: "",
        email: "",
        photoUrl: "",
      },
      upcPlaceholder: "6 79948 10006 8",
      productNamePlaceholder: "Nature's Earthly Choice Organic Lentil Trio",
      safePnamePlaceholder: "Nature\'s Earthly Choice Organic Lentil Trio",
    };
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "117030962609-9mblopptuccmm9fqhi2uv7eeea9bk1vh.apps.googleusercontent.com",
        // iosClientId: "<YOUR_CLIENT_ID_HERE>",
        // scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.setState({
          usrProfile: {
            signedIn: true,
            full_name: result.user.name,
            last_name: result.user.familyName,
            first_name: result.user.givenName,
            photoUrl: result.user.photoUrl,
            email: result.user.email,
          },
        });
      } else {
        console.log("\nLog failed due to: \n", result);
      }
    } catch (e) {
      console.log("\nError due to: \n", e);
      // console.log(type(value));
    }
  };

  recall = () => {
    let URL = "https://api.fda.gov/food/enforcement.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: "
    + this.state.upcPlaceholder + " +AND+product_description: \""  +
    this.state.safePnamePlaceholder +
    '" &limit=1000';

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    // this.recall();
    // if (this.state.usrProfile.signedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"Home"}>
              {() => <TabScreens usr={this.state.usrProfile} />}
            </Stack.Screen>
            <Stack.Screen name={"AllergyProfile"} component={AllergyProfile} />
            <Stack.Screen
              name={"CameraScanScreen"}
              component={CameraScanScreen}
            />
            <Stack.Screen
              name={"AfterUPCscanned"}
              component={AfterUPCscanned}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    // } else {
    //   return (
    //     <View style={styles.container}>
    //       <LoginPage signIn={this.signIn} />
    //     </View>
    //   );
    // }
  }
}

AppRegistry.registerComponent("App", () => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
  },
});
