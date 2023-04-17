import React, { Component } from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AnylineOCR from 'anyline-ocr-react-native-module';
import Result from './Result';
import LPConfig from './config/license_plate_config';

class AnylineApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasScanned: false,
      result: '',
      imagePath: '',
      fullImagePath: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  initLicense = () => {
    AnylineOCR.initSdk(licenseKey);
  };

  openAnyline = () => {
    AnylineOCR.setup(
        JSON.stringify(LPConfig),
        'scan',
        this.onResult,
        this.onError
    );
  };

  requestCameraPermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission allowed');
            this.openAnyline();
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
  };

  hasCameraPermission = async() => {
    try {
        const result = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA);
        return result;
    } catch (err) {
        console.warn(err);
    }
  };

  checkCameraPermissionAndOpen = () => {
    this.hasCameraPermission().then((hasCameraPermission) => {
        console.log('hasCameraPermission result is ' + hasCameraPermission);
        if (hasCameraPermission) {
            console.log('Opening OCR directly');
            this.openAnyline();
        } else {
            this.requestCameraPermission();
        }
    });
  };

  onResult = (result) => {
    const data = JSON.parse(result);
    const fullImagePath = data.fullImagePath;
    const imagePath = data.imagePath;
    delete data.fullImagePath;
    delete data.imagePath;

    this.setState({
        hasScanned: true,
        result: data,
        imagePath,
        fullImagePath
    });

    console.log(result);
  };

  onError = (error) => {
    if (error.message !== 'Canceled') {
      console.log(error.message);
      alert(error)
    }
  }

  emptyResult = () => {
    this.setState({
      hasScanned: false,
      result: {},
      imagePath: '',
      fullImagePath: ''
    });
  };

  render() {
    const {
        hasScanned,
        result,
        imagePath,
        fullImagePath
    } = this.state;

    const platformText = (Platform.OS === 'android') ?
        (<Text onPress={this.checkCameraPermissionAndOpen} key="androidButton">Open OCR reader!</Text>) :
        (<Text onPress={this.openAnyline} key="iosButton">Open OCR reader!</Text>);

    return (
        <View style={styles.container}>
            {hasScanned ? (
              <Result
                  result={result}
                  imagePath={imagePath}
                  fullImagePath={fullImagePath}
              />
            ) : (
                platformText
            )}
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0099ff',
  },
});

export default AnylineApp;