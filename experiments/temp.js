import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Navigator from "./routes/homeStack";
import "react-native-gesture-handler";

const getRecallFromApi = async () => {
  let upcPlaceholder = "6 79948 10006 8";
  let productNamePlaceholder = "Nature's Earthly Choice Organic Lentil Trio";
  let manufacturedurl =
    "https://api.fda.gov/drug/event.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: " +
    upcPlaceholder +
    " +AND+product_description: " +
    productNamePlaceholder +
    " &limit=1000";
  try {
    let response = await fetch(manufacturedurl);
    let json = await response.json();
    return json.movies;
    // console.log(json.movies);
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const upcPlaceholder = "6 79948 10006 8";
  const productNamePlaceholder = "Nature's Earthly Choice Organic Lentil Trio";
  const manufacturedurl =
    "https://api.fda.gov/drug/event.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: " +
    upcPlaceholder +
    " +AND+product_description: " +
    productNamePlaceholder +
    " &limit=1000";

  useEffect(() => {
    fetch(manufacturedurl)
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    // <Navigator/>);
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      )}
    </View>
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
