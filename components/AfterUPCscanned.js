import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default class AfterScanUpc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      upc: this.props.route.params.upc,
      product: {
        user_allergy: 0,
        prodName: "",
        allergens: "",
        cal: "",
        ingredients: "",
      },
      fat: [],
      staturated_fat: [],
      trans_fat: [],
      cholesterol: [],
      sodium: [],
      carbohydrates: [],
      fiber: [],
      sugars: [],
      protiens: [],
      vitamin_d: [],
      calcium: [],
      iron: [],
      potassium: [],
      recall: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getAllergyInfo();
  }

  isRecalled(givenUpc, givenName) {
    //Function Checks if the product has been matched to a single recall enforcement report
    //Takes a raw upc (unformatted) as a String, and a product name as a String as a paramter
    //Returns a boolean value that represents if there is an exact match or not
    let exactMatch = false;
    fetch(this.urlAssembler(givenUpc, givenName), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        if (json[1] == "results") {
          if (json[1].length == 1) {
            exactMatch = true;
          }
        }
      })
      .catch((error) => {
        console.log("An error occured: " + error);
      });
    // console.log("Match: " + exactMatch);
    return exactMatch;
  }

  urlAssembler(rawUPC, productName) {
    //Function Assembles Open FDA API Query
    //Takes an unformatted UPC as a String, and the name of the product as a String
    //Returns correctly formatted query suitable for fetch method and the API
    let url =
      "https://api.fda.gov/food/enforcement.json?api_key=ioNI0UpkgYZ0KxjlPukkrx4rf9wkYYPTqNMnYQA7&search=openfda.upc.exact: " +
      this.upcFormatter(rawUPC) +
      ' +AND+product_description: "' +
      productName +
      '" &limit=1000';
    return url;
  }

  upcFormatter(rawUPC) {
    //Function formats a concatenated UPC into a formatted UPC with white space
    //Open FDA API query syntax is sensitive to white space in UPC format
    //Syntax requires a "* ***** ***** *" format
    //Function returns a String containing the correctly formatted UPC code
    let firstDigit = rawUPC.substring(0, 1);
    let firstBurst = rawUPC.substring(1, 6);
    let secondBurst = rawUPC.substring(6, 11);
    let lastDigit = rawUPC.substring(11);
    let formattedUPC =
      firstDigit + " " + firstBurst + " " + secondBurst + " " + lastDigit;
    return formattedUPC;
  }

  parseVal(arr) {
    // parset the nutrition unit and daily val
    if ((arr[1] == null) | (arr[2] == "")) {
      arr[1] = 0;
    }
    if ((arr[2] == null) | (arr[2] == "")) {
      arr[2] = 0;
    }
    return arr;
  }

  getAllergyInfo = () => {
    // console.log("Get info fetch func called");
    let URL =
      "http://18.220.4.110:8080/api/v1/CSCI380/getUPCinfo?email=" +
      this.state.email +
      "&upc=" +
      this.state.upc;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const arr = json[1];
        let temp = "";

        arr.forEach((res) => {
          temp += res + ", ";
        });

        // trim the last common
        temp = temp.substring(0, (temp.length - 2));

        this.setState({
          // set the product obj
          product: {
            user_allergy: json[17],
            prodName: json[0],
            allergens: json[2],
            cal: json[3],
            ingredients: temp,
          },

          // set each nutrition val
          fat: this.parseVal(json[4]),
          staturated_fat: this.parseVal(json[5]),
          trans_fat: this.parseVal(json[6]),
          cholesterol: this.parseVal(json[7]),
          sodium: this.parseVal(json[8]),
          carbohydrates: this.parseVal(json[9]),
          fiber: this.parseVal(json[10]),
          sugars: this.parseVal(json[11]),
          protiens: this.parseVal(json[12]),
          vitamin_d: this.parseVal(json[13]),
          calcium: this.parseVal(json[14]),
          iron: this.parseVal(json[15]),
          potassium: this.parseVal(json[16]),
          isLoading: false,
        });
        // console.log(json);
      })
      .catch((error) => {
        console.log("An error occured due to: " + error);
      });
  };

  AllergyBox = () => {
    switch (this.state.product.user_allergy) {
      case "1":
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
      case "0":
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
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardGrp1}>
            {this.AllergyBox()}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FDAcall", {
                  title: "Recall Details",
                  upc: this.state.upc,
                  productName: this.state.product.prodName,
                })
              }
              style={styles.button}
            >
              {this.state.isRecalled ? (
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

              {this.state.isRecalled ? (
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
                  <Text style={styles.txtProductName}>
                    {this.state.product.prodName}
                  </Text>
                </View>
                <View style={styles.allgeryGrp}>
                  <Text style={styles.allergens}>Allergens:</Text>
                  <Text style={styles.txtAllergens}>
                    {this.state.product.allergens}
                  </Text>
                </View>
                <View style={styles.calGrp}>
                  <View style={styles.caloriesRow}>
                    <Text style={styles.calories}>Calories:</Text>
                    <Text style={styles.dfea2}>{this.state.product.cal}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.ingredientsGrpStack}>
                <View style={styles.ingredientsGrp}>
                  <Text style={styles.ingredients}>Ingredients:</Text>
                  <View style={styles.rect2}>
                    <Text style={styles.txtIngrdient}>
                      {this.state.product.ingredients}
                    </Text>
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
                      <DataTable.Cell>{this.state.fat[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.fat[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.fat[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        {this.state.staturated_fat[0]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.staturated_fat[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.staturated_fat[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.trans_fat[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.trans_fat[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.trans_fat[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        {this.state.cholesterol[0]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.cholesterol[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.cholesterol[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.sodium[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.sodium[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.sodium[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        {this.state.carbohydrates[0]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.carbohydrates[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.carbohydrates[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.fiber[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.fiber[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.fiber[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.sugars[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.sugars[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.sugars[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.protiens[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.protiens[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.protiens[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.vitamin_d[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.vitamin_d[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.vitamin_d[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.calcium[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.calcium[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.calcium[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.iron[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.iron[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.iron[2]}
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>{this.state.potassium[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.potassium[1]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {this.state.potassium[2]}
                      </DataTable.Cell>
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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
    height: 1080,
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
    height: 100,
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
