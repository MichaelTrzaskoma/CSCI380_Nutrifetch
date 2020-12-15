import React, { Component } from "react";
import { StyleSheet, Text, View, Button, ImageBackground, } from "react-native";
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

import FDAcall from "./components/FDAcall";

import AllergyProfileInput from "./components/AllergyProfileInput";
import CameraScanScreen from "./components/CameraScanScreen";
import AfterUPCscanned from "./components/AfterUPCscanned";

const backImg = {uri : "https://images.pexels.com/photos/255501/pexels-photo-255501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoginPage(props) {
  // init landing page for the Google Signin
  return (
    <View>
    <ImageBackground source = {backImg} style = {styles.image}>
      <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>NutriFetch</Text>
        <Text style = {styles.subtitle}> A Team MHz Collaboration</Text>
        <Text style={styles.header}>Login with Google to Continue!</Text>
        <View style = {{marginLeft: 200,}}>
        <Button color = "white" title= "Sign in" onPress={() => props.signIn()} />
        </View>
      </View>
    </ImageBackground>   
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
      safePnamePlaceholder: "Nature's Earthly Choice Organic Lentil Trio",
    };
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "117030962609-9mblopptuccmm9fqhi2uv7eeea9bk1vh.apps.googleusercontent.com",
         iosClientId: "117030962609-taq9vsss462r8gsnduti8d5c2t314rdv.apps.googleusercontent.com",
         scopes: ["profile", "email"],
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
    // test func
    let URL =
      "https://api.fda.gov/food/enforcement.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: " +
      this.state.upcPlaceholder +
      ' +AND+product_description: "' +
      this.state.safePnamePlaceholder +
      '" &limit=1000';

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // this.recall();
    if (this.state.usrProfile.signedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"Home"}>
              {() => <TabScreens usr={this.state.usrProfile} />}
            </Stack.Screen>

            <Stack.Screen
              name={"AllergyProfileInput"}
              component={AllergyProfileInput}
              // pass the user obj directly to the screen
              initialParams={{ usr_profile: this.state.usrProfile }}
              // let the parent screen decide what this child component title should be
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name={"CameraScanScreen"}
              component={CameraScanScreen}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name={"AfterUPCscanned"}
              component={AfterUPCscanned}
              options={({ route }) => ({ title: route.params.title })}
              initialParams={{email: this.state.usrProfile.email}}
            />

            <Stack.Screen
              name={"FDAcall"}
              component={FDAcall}
              options={({ route }) => ({ title: route.params.title })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoginPage signIn={this.signIn} />
        </View>
      );
    }
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
  title : {
    color: "white", 
    fontSize : 40, 
    marginLeft : 200, 
    marginTop: -50,
},
subtitle: {
  color: "white",
  fontSize: 12,
  marginLeft: 200,
  marginTop: 10,

},

  
  header: {
    fontSize: 14,
    color : "white",
    marginLeft: 200,
    marginTop : 100,
    
  },
  image: {
    height: 767,
    width: 793,
    marginLeft : -195,
    marginTop: -8,  
  },
});
