import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import MultiSelect from "react-native-multiple-select";

const items = [
  {
    id: "92iijs7yta",
    name: "Balsam of Peru",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Buckwheat",
  },
  {
    id: "16hbajsabsd",
    name: "Celery",
  },
  {
    id: "nahs75a5sg",
    name: "Egg",
  },
  {
    id: "667atsas",
    name: "Fish",
  },
  {
    id: "hsyasajs",
    name: "Fruit",
  },
  {
    id: "djsjudksjd",
    name: "Garlic",
  },
  {
    id: "sdhyaysdj",
    name: "Hot Peppers",
  },
  {
    id: "suudydjsjd",
    name: "Oats",
  },
  {
    id: "fgdhgfhddf",
    name: "Maize",
  },
  {
    id: "lljjgftfds",
    name: "Milk",
  },
  {
    id: "jjgfdtrsaa",
    name: "Peanut",
  },
  {
    id: "gfhrtefgbf",
    name: "Poultry Meat",
  },
  {
    id: "tr53gfh67s",
    name: "Red Meat",
  },
  {
    id: "ghdfc53cfh",
    name: "Rice",
  },
  {
    id: "dsfs341dfv",
    name: "Sesame",
  },
  {
    id: "sfdbv53fgh",
    name: "Shellfish",
  },
  {
    id: "nfdssfht4f",
    name: "Soy",
  },
  {
    id: "4fsd53dgbf",
    name: "Sulfites",
  },
  {
    id: "dfkgjdfska",
    name: "Tartrazine",
  },
  {
    id: "345kvcxadf",
    name: "Tree Nut",
  },
  {
    id: "sjdfdsaf3g",
    name: "Wheat",
  },
];

export default class AllergyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set the user account info from navigation
      // I'll handle the navigation pass the props
      fname: this.props.route.params.usr_profile.first_name,
      lname: this.props.route.params.usr_profile.last_name,
      email: this.props.route.params.usr_profile.email,

      selectedItems: [],
      gender: "",
      age: 0,
      weight: 0,
    };
    this.handleGender = this.handleGender.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
  }

  handleGender(text) {
    this.setState({
      gender: text,
    });
  }

  handleAge(text) {
    this.setState({
      age: text,
    });
  }

  handleWeight(text) {
    this.setState({
      weight: text,
    });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  handleButtonPress() {
    let URL = "http://18.220.4.110:8080/api/v1/CSCI380/profileInput";
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allergens: this.state.selectedItems,
        age: this.state.age,
        gender: this.state.gender,
        weight: this.state.weight,
      }),
    })
      .then(function (response) {
        Alert.alert("Response", response);
      })
      .then(function (json) {
        Alert.alert("JSON", json);
      });
    //this.props.navigation.navigate("");
  }
  render() {
    const { selectedItems } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.grp}>
          <View style={styles.selector_grp}>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              ref={(component) => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick Allergy Items"
              searchInputPlaceholderText="Search Items..."
              // onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="gray"
              tagBorderColor="gray"
              tagTextColor="gray"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>
              {this.multiSelect &&
                this.multiSelect.getSelectedItemsExt(selectedItems)}
            </View>
          </View>

          <View style={styles.input1_grp}>
            <Text style={styles.txt_gender}>Gender</Text>
            <TextInput
              onChangeText={this.handleGender}
              placeholder="Gender"
              style={styles.input1}
            ></TextInput>
          </View>

          <View style={styles.input1_grp}>
            <Text style={styles.txt_gender}>Age</Text>
            <TextInput
              onChangeText={this.handleAge}
              placeholder="Age"
              style={styles.input1}
              keyboardType="number-pad"
            ></TextInput>
          </View>

          <View style={styles.input1_grp}>
            <Text style={styles.txt_gender}>Weight</Text>
            <TextInput
              onChangeText={this.handleWeight}
              placeholder="Weight"
              style={styles.input1}
              keyboardType="number-pad"
            ></TextInput>
          </View>

          <TouchableOpacity
            // this will navigate to Zak's recall detail screen
            onPress={() => this.handleButtonPress()}
            style={styles.button}
          >
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  grp: {
    height: 550,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 50,
  },
  selector_grp: {
    // margin: 16,
    width: "93%",
    height: 50,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 200,
    position: "relative",
  },
  input1_grp: {
    width: "93%",
    height: 50,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  txt_gender: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 15,
    marginLeft: 9,
  },
  input1: {
    color: "#121212",
    height: 30,
    width: "95%",
    marginTop: 2,
    marginLeft: 9,
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "rgba(65,117,5,1)",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 40,
  },
  mulSelector: {
    // flex: 0.5,
    // width: "90%",
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 150,
    minWidth: 300,
    position: "absolute",
    zIndex: 10,
    // width: "100%"
    // width: "80%",
  },
  submitTxt: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center",
  },
});
