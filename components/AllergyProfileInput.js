import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MultiSelect from "react-native-multiple-select";

const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
  {
    id: "667atsas",
    name: "Maiduguri",
  },
  {
    id: "hsyasajs",
    name: "Anambra",
  },
  {
    id: "djsjudksjd",
    name: "Benue",
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna",
  },
  {
    id: "suudydjsjd",
    name: "Abuja",
  },
];

export default class AllergyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set the user account info from navigation
      // I'll handle the navigation pass the props
      fname: this.props.route.parames.usr_profile.first_name,
      lname: this.props.route.parames.usr_profile.last_name,
      email: this.props.route.parames.usr_profile.email,
      
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

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.grp}>
          <View style={styles.mulSelector}>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              ref={(component) => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log(text)}
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
              // style={this.styles.mulSelector}
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
              placeholder="Male"
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
            onPress={() => props.navigation.navigate("")}
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
    height: 450,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 50,
  },
  input1_grp: {
    width: "93%",
    height: 50,
    // marginTop: 20,
    marginLeft: 10,
    // top: 5,
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
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    minWidth: 300,
    // width: "100%"
    // width: "80%",
  },
  submitTxt: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center",
  },
});
