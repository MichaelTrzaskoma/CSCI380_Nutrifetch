// this is experiment file
// to test fetch func --> fetch info from the REST API

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function test_fetch({ navigation }) {
  getAPIINFO = () => {
    fetch("https://879099766.pythonanywhere.com/api/v1/csci426", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signedIn: usr_obj.signedIn,
        full_name: usr_obj.full_name,
        last_name: usr_obj.last_name,
        first_name: usr_obj.first_name,
        photoUrl: usr_obj.photoUrl,
        email: usr_obj.email,
      }),

      // bodu: usr_obj
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Server Response:");
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.buttonBar_itme}>
      <Text>This is Home no sign panel!</Text>
      <Text>Coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBar_itme: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
