import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import CameraScanScreen from "./CameraScanScreen";
import AfterUPCscanned from "./AfterUPCscanned";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        onPress={() => navigation.navigate('AfterUPCscanned')}
        style={styles.button}
      >
        <View style={styles.iconRow}>
          <MaterialCommunityIconsIcon
            name="barcode-scan"
            style={styles.icon}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.scanBarCode}>Scan Bar Code</Text>
        </View>
        <View style={styles.iconRowFiller}></View>
        <IoniconsIcon
          name="ios-arrow-forward"
          style={styles.icon2}
        ></IoniconsIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    marginTop: 86
  },
  icon: {
    color: "rgba(74,144,226,1)",
    fontSize: 25
  },
  scanBarCode: {
    color: "#121212",
    marginLeft: 21,
    marginTop: 5
  },
  iconRow: {
    height: 27,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 12
  },
  iconRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
    marginRight: 20,
    marginTop: 12
  }
});

