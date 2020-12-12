import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default class AfterScanUpc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: this.props.route.parames.email,
      product: {
        user_allergy: 0,
        prodName: "",
        allergens: "",
        cal: "",
        ingredients: "",
        nutriVal: [],
      },
      recall: true,
    };
  }

  getAllergyInfo = () => {
    fetch("http://3.21.169.238/api/v1/CSCI380/getUPCinfo", {
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
        console.log("An error occured due to: " + error);
      });
  };

  AllergyBox = () => {
    switch (this.state.product.user_allergy) {
      case 0:
        // product is allergic && there's user allergy profile in db
        return (
          <View style={styles.cardGrp1_leftContainer}>
            <View style={styles.leftIconBox}>
              <IoniconsIcon
                name="ios-checkmark-circle"
                style={styles.AllergyIcon_red}
              ></IoniconsIcon>
            </View>

            <View style={styles.leftTxtBox}>
              <Text style={styles.loremIpsum}>
                You are allegic{"\n"}to this product
              </Text>
            </View>
          </View>
        );
        break;
      case 1:
        // product is not allergic && there's user allergy profile in db
        return (
          <View style={styles.cardGrp1_leftContainer}>
            <View style={styles.leftIconBox}>
              <IoniconsIcon
                name="ios-checkmark-circle"
                style={styles.AllergyIcon_green}
              ></IoniconsIcon>
            </View>

            <View style={styles.leftTxtBox}>
              <Text style={styles.loremIpsum}>
                You are not allegic {"\n"} to this product
              </Text>
            </View>
          </View>
        );
        break;
      default:
        return (
          <View style={styles.cardGrp1_leftContainer}>
            <View style={styles.leftIconBox}>
              <IoniconsIcon
                name="ios-checkmark-circle"
                style={styles.AllergyIcon_gray}
              ></IoniconsIcon>
            </View>

            <View style={styles.leftTxtBox}>
              <Text style={styles.loremIpsum}>
                You don't have an{"\n"}allergy profile with us.
              </Text>
            </View>
          </View>
        );
        // there's no user profile exists in the db
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardGrp1}>
            {this.AllergyBox()}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Untitled")}
              style={styles.button}
            >
              {this.state.recall ? (
                <View style={styles.rightIconBox}>
                  <IoniconsIcon
                    name="md-lock"
                    style={styles.recallIcon_red}
                  ></IoniconsIcon>
                </View>
              ) : (
                <View style={styles.rightIconBox}>
                  <IoniconsIcon
                    name="md-lock"
                    style={styles.recallIcon_green}
                  ></IoniconsIcon>
                </View>
              )}

              {this.state.recall ? (
                <View style={styles.rightTxtBox}>
                  <Text style={styles.loremIpsum2}>There's a recall</Text>
                </View>
              ) : (
                <View style={styles.rightTxtBox}>
                  <Text style={styles.loremIpsum2}>There's no recall</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.cardGrp2}>
            <View style={styles.productNameGrpStackStack}>
              <View style={styles.productNameGrpStack}>
                <View style={styles.productNameGrp}>
                  <Text style={styles.productName}>Product Name:</Text>
                  <Text style={styles.txtProductName}>dfeaw{"\n"}sgfe</Text>
                </View>
                <View style={styles.allgeryGrp}>
                  <Text style={styles.allergens}>Allergens:</Text>
                  <Text style={styles.txtAllergens}>dfeaw{"\n"}sgfe</Text>
                </View>
                <View style={styles.calGrp}>
                  <View style={styles.caloriesRow}>
                    <Text style={styles.calories}>Calories:</Text>
                    <Text style={styles.dfea2}>dfea</Text>
                  </View>
                </View>
              </View>
              <View style={styles.ingredientsGrpStack}>
                <View style={styles.ingredientsGrp}>
                  <Text style={styles.ingredients}>Ingredients:</Text>
                  <View style={styles.rect2}>
                    <Text style={styles.txtIngrdient}>Here</Text>
                  </View>
                </View>
                <View style={styles.nutriValeGrp}>
                  <Text style={styles.nutriValeTxt}>Nutrition Value:</Text>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Name</DataTable.Title>
                      <DataTable.Title numeric>Unit</DataTable.Title>
                      <DataTable.Title numeric>Daily (%)</DataTable.Title>
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
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#E6E6E6",
    height: 1200,
    width: "100%",
    alignSelf: "center",
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
  AllergyIcon_green: {
    // if the user not allergy && has profile with us
    // use this styling
    color: "rgba(126,211,33,1)",
    fontSize: 35,
    alignSelf: "center",
  },
  AllergyIcon_red: {
    // if the user allergy && has profile with us
    // use this styling
    color: "red",
    fontSize: 35,
    alignSelf: "center",
  },
  AllergyIcon_gray: {
    // if the user allergy && has profile with us
    // use this styling
    color: "gray",
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
  recallIcon_green: {
    color: "rgba(126,211,33,1)",
    fontSize: 40,
    alignSelf: "center",
  },
  recallIcon_red: {
    color: "red",
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
    height: 1000,
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
  allgeryGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 80,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    position: "absolute",
    top: 79,
    left: 0,
    right: 0,
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
    top: 158,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  calories: {
    color: "#121212",
    width: 68,
    height: 19,
    fontWeight: "bold",
  },
  dfea2: {
    color: "#121212",
    height: 19,
    width: 160,
    marginLeft: 2,
  },
  caloriesRow: {
    height: 19,
    flexDirection: "row",
    flex: 1,
    marginRight: 88,
    marginLeft: 18,
    marginTop: 11,
  },
  productNameGrpStack: {
    top: 0,
    left: 0,
    height: 198,
    position: "absolute",
    right: 0,
  },
  ingredientsGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 155,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
  nutriValeGrp: {
    backgroundColor: "rgba(255,255,255,1)",
    // height: 247,
    width: "90%",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 5,
    position: "absolute",
    top: 153,
    left: 0,
    right: 0,
    marginLeft: 15,
  },
  nutriValeTxt: {
    color: "#121212",
    width: "90%",
    height: 19,
    marginTop: 15,
    marginLeft: 3,
    fontWeight: "bold",
  },
  ingredientsGrpStack: {
    top: 197,
    left: 0,
    height: 400,
    position: "absolute",
    right: 0,
  },
  productNameGrpStackStack: {
    height: 597,
  },
});
