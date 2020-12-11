// this is experiment file
// to test fetch func --> fetch info from the REST API

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function test_fetch({ navigation }) {
  getAPIINFO = () => {
    fetch("https://world.openfoodfacts.org/api/v0/product/ {UPC Code}.json", {
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
