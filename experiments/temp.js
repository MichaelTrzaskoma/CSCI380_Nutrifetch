import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default class FDAcall extends React.Component {
  constructor() {
    super();
    this.state({
      upcPlaceholder: "6 79948 10006 8",
      productNamePlaceholder: "Nature's Earthly Choice Organic Lentil Trio",
      safePnamePlaceholder: "Nature's Earthly Choice Organic Lentil Trio",
    });
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    //Below is Working Querry
    //let resp = await fetch('https://api.fda.gov/food/enforcement.json?search=openfda.upc.exact: 6 79948 10006 8 +AND+product_description:"Nature\'s Earthly Choice Organic Lentil Trio"  &limit=1000')
    //Below is Non-WorkingQuerry
    let manufacturedurl =
        "https://api.fda.gov/food/enforcement.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: " + this.state.upcPlaceholder +
        ' +AND+product_description: "' +
        this.state.safePnamePlaceholder +
        '" &limit=1000';

    let resp = fetch(manufacturedurl);
    let respJson = resp.json();
    console.warn(respJson);
    console.log(respJson);
  }

  render() {
    apiCall();
    return (
      <View>
        <Text style={{ alignItems: "center" }}>"Dispay"</Text>
      </View>
    );
  }
}
