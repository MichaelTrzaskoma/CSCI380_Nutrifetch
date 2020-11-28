import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ProfileInputScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.container_grp}>
        <View style={styles.container_bkground}>
          {/* <Text style={styles.requiredDetails}>Required Details</Text> */}
          <View style={styles.input1_grp}>
            <Text style={styles.txt_gender}>Gender</Text>
            <TextInput
              placeholder="placeholder"
              style={styles.input1}
            ></TextInput>
          </View>
          <View style={styles.input2_grp}>
            <Text style={styles.txt_dob}>Date of Birth</Text>
            <TextInput
              placeholder="mm/dd/yyyy"
              keyboardType="numeric"
              style={styles.input2}
            ></TextInput>
          </View>
          <View style={styles.input3_grp}>
            <Text style={styles.txt_zip}>Zip Code</Text>
            <TextInput
              placeholder="00001"
              keyboardType="numeric"
              style={styles.input3}
            ></TextInput>
          </View>
          <View style={styles.input4_grp}>
            <Text style={styles.txt_gpa}>GPA</Text>
            <TextInput
              placeholder="4.0"
              keyboardType="numeric"
              style={styles.input4}
            ></TextInput>
          </View>
          <View style={styles.submit_grp}>
            <TouchableOpacity
              // onPress={() => navigation.navigate(InputScreen2)}
              style={styles.btn_submit}
            >
              <Text style={styles.next}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_grp: {
    backgroundColor: "rgba(230, 230, 230,1)",
    flex: 1,
  },
  container_bkground: {
    height: 400,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 20,
  },
  // requiredDetails: {
  //   fontWeight: "bold",
  //   color: "#121212",
  //   lineHeight: 0,
  //   fontSize: 20,
  //   marginTop: 34,
  //   marginLeft: 20
  // },
  input1_grp: {
    width: "93%",
    height: 50,
    marginTop: 37,
    marginLeft: 10,
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
  input2_grp: {
    width: "93%",
    height: 50,
    marginTop: 15,
    marginLeft: 10,
  },
  txt_dob: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 15,
    marginLeft: 9,
  },
  input2: {
    color: "#121212",
    height: 30,
    width: "95%",
    marginTop: 2,
    marginLeft: 9,
  },
  input3_grp: {
    width: "93%",
    height: 50,
    marginTop: 15,
    marginLeft: 10,
  },
  txt_zip: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 15,
    marginLeft: 9,
  },
  input3: {
    color: "#121212",
    height: 30,
    width: "95%",
    marginTop: 2,
    marginLeft: 9,
  },
  input4_grp: {
    width: "93%",
    height: 50,
    marginTop: 15,
    marginLeft: 10,
  },
  txt_gpa: {
    fontWeight: "bold",
    color: "#121212",
    fontSize: 15,
    marginLeft: 9,
  },
  input4: {
    color: "#121212",
    height: 30,
    width: "95%",
    marginTop: 2,
    marginLeft: 9,
  },
  submit_grp: {
    width: "93%",
    height: 40,
    marginTop: 20,
    marginLeft: 15,
  },
  btn_submit: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(0,149,47,1)",
    alignSelf: "center",
  },
  next: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "center",
  },
});
