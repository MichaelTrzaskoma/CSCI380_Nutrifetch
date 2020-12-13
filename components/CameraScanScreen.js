import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';
export default function CameraScanScreen(props){
  const navigation = useNavigation();

  return <CameraScan {...props} navigation={navigation}/>;
}
class CameraScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  handleBarCodeScanned = ({ type, data }) => {
    // handle the UPC after scanning
    this.setState({ scanned: true });
    this.props.navigation.navigate('AfterUPCscanned', {
      title: "Scan Result",
      upc: data,
      // the user profile obj from parent component (home screen)
      // usr_profile: this.props.route.parames.usr_profile,
    });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}
