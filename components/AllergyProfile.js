import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function AllergyProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.grp}>
        <Text style={styles.allergyTxt}>
          Please tell us the product(s) that you are allergic{"\n"}to. Separate
          by a comma.
        </Text>
        <TextInput
          placeholder="placeholder"
          numberOfLines={10}
          spellCheck={true}
          selectTextOnFocus={true}
          multiline={true}
          style={styles.allergyInput}
        ></TextInput>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  grp: {
    height: 523,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 78
  },
  allergyTxt: {
    color: "#121212",
    fontSize: 15,
    marginTop: 28,
    alignSelf: "center"
  },
  allergyInput: {
    color: "#121212",
    height: 332,
    width: 311,
    marginTop: 31,
    alignSelf: "center"
  },
  button: {
    width: 326,
    height: 45,
    backgroundColor: "rgba(65,117,5,1)",
    justifyContent: "center",
    marginTop: 28,
    alignSelf: "center"
  },
  submitTxt: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  }
});
