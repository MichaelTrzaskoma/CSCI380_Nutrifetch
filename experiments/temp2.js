// this screen will be navigated after the user
// scanned the product UPC

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { DataTable } from "react-native-paper";

export default class AfterUPCscanned extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardGrp1}>
            <View style={styles.cardGrp1_leftContainer}>
              <View style={styles.leftIconBox}>
                <IoniconsIcon
                  name="ios-checkmark-circle"
                  style={styles.icon}
                ></IoniconsIcon>
              </View>
              <View style={styles.leftTxtBox}>
                <Text style={styles.loremIpsum}>
                  You Are Not {"\n"}Allegic to this
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Untitled")}
              style={styles.button}
            >
              <View style={styles.rightIconBox}>
                <IoniconsIcon
                  name="md-lock"
                  style={styles.icon2}
                ></IoniconsIcon>
              </View>
              <View style={styles.rightTxtBox}>
                <Text style={styles.loremIpsum2}>
                  No Recal/{"\n"}There&#39;s a recall
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardGrp2}>
            <View style={styles.productNameGrp}>
              <Text style={styles.productName}>Product Name:</Text>
              <Text style={styles.txtProductName}>dfeaw{"\n"}sgfe</Text>
            </View>

            {/* <View style={styles.ingredientsGrp}> */}
              <Text style={styles.ingredients}>Ingredients:</Text>
              <View style={styles.rect2}>
                <Text style={styles.txtIngrdient}>Here</Text>
              </View>
            {/* </View> */}

            {/* <View style={styles.ingredientsGrp}> */}
            <View style={styles.allgeryGrp}>
              <Text style={styles.allergens}>Allergens:</Text>
              <Text style={styles.txtAllergens}>dfeaw{"\n"}sgfe</Text>
            </View>
            {/* </View> */}

            {/* <View style={styles.ingredientsGrp}> */}
              <View style={styles.calGrp}>
                <Text style={styles.calories}>Calories:</Text>
                <Text style={styles.dfea2}>dfea</Text>
              </View>
            {/* </View> */}

            {/* <View style={styles.nutriValeGrp}> */}
              <Text style={styles.nutriValeTxt}>Nutrition Value:</Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Nutrition</DataTable.Title>
                  <DataTable.Title numeric>Calories</DataTable.Title>
                  <DataTable.Title numeric>Fat</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                  <DataTable.Cell numeric>159</DataTable.Cell>
                  <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>wegwesandwich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Igtrswich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>23rdawfdwich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>fagerwich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            {/* </View> */}

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    width: "100%",
    // height: 1080,
  },
  cardGrp1: {
    width: "94%",
    height: 127,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 29,
    marginLeft: 12,
  },
  cardGrp1_leftContainer: {
    flex: 0.5,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
  },
  leftIconBox: {
    flex: 0.5,
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  icon: {
    color: "rgba(126,211,33,1)",
    fontSize: 35,
    alignSelf: "center",
  },
  leftTxtBox: {
    flex: 0.5,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
  },
  loremIpsum: {
    color: "#121212",
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    flex: 0.5,
    backgroundColor: "rgba(240, 240, 240,1)",
  },
  rightIconBox: {
    flex: 0.5,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
  },
  icon2: {
    color: "rgba(126,211,33,1)",
    fontSize: 40,
    alignSelf: "center",
  },
  rightTxtBox: {
    flex: 0.5,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
  },
  loremIpsum2: {
    color: "#121212",
    textAlign: "center",
    alignSelf: "center",
  },
  cardGrp2: {
    width: "94%",
    height: 1200,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 12,
  },
  productNameGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 80,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
  },
  productName: {
    color: "#121212",
    width: 97,
    height: 19,
    marginTop: 15,
    marginLeft: 18,
    fontWeight: "bold",
  },
  txtProductName: {
    color: "#121212",
    height: 35,
    width: "90%",
    // alignSelf: "center",
    marginLeft: 25,
  },
  ingredientsGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 155,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
  },
  ingredients: {
    color: "#121212",
    width: 76,
    height: 19,
    marginTop: 15,
    marginLeft: 18,
    fontWeight: "bold",
  },
  rect2: {
    width: 289,
    height: 97,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 3,
    marginLeft: 23,
  },
  txtIngrdient: {
    color: "#121212",
    flex: 1,
    marginRight: 5,
  },
  allgeryGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 80,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
  },
  allergens: {
    color: "#121212",
    width: 97,
    height: 19,
    marginTop: 15,
    marginLeft: 18,
    fontWeight: "bold",
  },
  txtAllergens: {
    color: "#121212",
    height: 35,
    width: "90%",
    // alignSelf: "center",
    marginLeft: 25,
  },
  calGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 40,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  calories: {
    color: "#121212",
    width: 68,
    height: 19,
    marginLeft: 18,
    alignSelf: "center",
  },
  dfea2: {
    color: "#121212",
    height: 19,
    width: 160,
    marginLeft: 2,
    alignSelf: "center",
  },
  nutriValeGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    // height: "auto",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "90%",
    marginLeft: 15,
  },
  calGrpStack: {
    height: 287,
  },
  nutriValeTxt: {
    color: "#121212",
    width: "90%",
    height: 19,
    marginTop: 15,
    marginLeft: 3,
    fontWeight: "bold",
  },
});
