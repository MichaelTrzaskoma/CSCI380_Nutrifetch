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
      selectedItems: [],
    };
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

          <TouchableOpacity
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
    height: 523,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 50,
  },
  button: {
    width: "80%",
    height: 45,
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
