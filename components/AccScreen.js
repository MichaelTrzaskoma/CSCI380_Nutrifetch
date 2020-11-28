// user did not sign in yet

import React, { Component, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import "react-native-gesture-handler";

import ProfileInputScreen from "./ProfileInputScreen";

function LoginPage(props) {
  // init landing page for the Google Signin
  return (
    <View>
      <Text style={styles.header}>Sign In With Your Credentials</Text>
      <Button title="Sign in" onPress={() => props.signIn()} />
    </View>
  );
}

export default function AccScreen({ navigation }) {
  const [usr_obj, setState_usrObj] = useState({
    signedIn: false,
    full_name: "",
    last_name: "",
    first_name: "",
    email: "",
    photoUrl: "",
  });

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        // Android client
        androidClientId:
          "117030962609-9mblopptuccmm9fqhi2uv7eeea9bk1vh.apps.googleusercontent.com",

        // iOS client
        // iosClientId: "<YOUR_CLIENT_ID_HERE>",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setState_usrObj({
          signedIn: true,
          full_name: result.user.name,
          last_name: result.user.familyName,
          first_name: result.user.givenName,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
        });
      } else {
        console.log("\nLog failed due to: \n", result);
      }
    } catch (e) {
      console.log("\nError due to: \n", e);
      // console.log(type(value));
    }
  };

  if (usr_obj.signedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.grp1}>
            <View style={styles.iconRow}>
              <FontAwesomeIcon
                name="user-o"
                style={styles.icon}
              ></FontAwesomeIcon>
              <View style={styles.fullNameHereColumn}>
                <Text style={styles.fullNameHere}>{usr_obj.full_name}</Text>
                <Text style={styles.email}>Email: {usr_obj.email}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ProfileInputScreen, {
                title: "Input Required Info",
              })
            }
            style={styles.grp2}
          >
            <View style={styles.icon2Row}>
              <EntypoIcon name="add-to-list" style={styles.icon2}></EntypoIcon>
              <Text style={styles.addProfileDetail}>Add Profile Detail</Text>
            </View>
            <View style={styles.icon2RowFiller}></View>
            <MaterialIconsIcon
              name="chevron-right"
              style={styles.icon5}
            ></MaterialIconsIcon>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => navigation.navigate("Untitled")}
            style={styles.grp3}
          >
            <View style={styles.icon3Row}>
              <FontAwesomeIcon
                name="sign-out"
                style={styles.icon3}
              ></FontAwesomeIcon>
              <Text style={styles.signOut}>Sign Out</Text>
            </View>
            <View style={styles.icon3RowFiller}></View>
            <MaterialIconsIcon
              name="chevron-right"
              style={styles.icon4}
            ></MaterialIconsIcon>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.signIn_container}>
        <LoginPage signIn={signIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signIn_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  rect: {
    backgroundColor: "#E6E6E6",
    flex: 1,
  },
  grp1: {
    height: 125,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 57,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 60,
  },
  fullNameHere: {
    color: "#121212",
    fontSize: 16,
  },
  email: {
    color: "rgba(78,78,78,1)",
    fontSize: 12,
    marginTop: 13,
  },
  fullNameHereColumn: {
    width: 159,
    marginLeft: 29,
    marginTop: 8,
    marginBottom: 6,
  },
  iconRow: {
    height: 60,
    flexDirection: "row",
    marginTop: 32,
    marginLeft: 21,
    marginRight: 99,
  },
  grp2: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 33,
  },
  icon2: {
    color: "rgba(65,117,5,1)",
    fontSize: 25,
  },
  addProfileDetail: {
    color: "#121212",
    fontSize: 15,
    marginLeft: 22,
    marginTop: 4,
  },
  icon2Row: {
    height: 27,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 12,
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  icon5: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13,
  },
  grp3: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 27,
  },
  icon3: {
    color: "rgba(208,2,27,1)",
    fontSize: 25,
  },
  signOut: {
    color: "#121212",
    fontSize: 15,
    marginLeft: 24,
    marginTop: 3,
  },
  icon3Row: {
    height: 25,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 13,
  },
  icon3RowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  icon4: {
    color: "rgba(174,174,174,1)",
    fontSize: 25,
    marginRight: 10,
    marginTop: 13,
  },
});
