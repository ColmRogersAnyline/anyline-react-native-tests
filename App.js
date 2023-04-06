import React, { Component } from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  LayoutAnimation,
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
      SDKVersion: '',
      fullImagePath: ''
    }
  }

  componentDidMount = async () => {
    const SDKVersion = await AnylineOCR.getSDKVersion();
    this.setState({SDKVersion: SDKVersion});
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
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

  // openAnyline = async () => {
  //   try {
  //     console.log(`AnylineOCR.setupPromise`);
  //     const result = await AnylineOCR.setupPromise(
  //       JSON.stringify(LPConfig),
  //       'scan',
  //     );

  //     console.log(result);

  //     const data = JSON.parse(result);
  //     LayoutAnimation.easeInEaseOut();
  //     const fullImagePath = data.fullImagePath;
  //     const imagePath = data.imagePath;
  //     delete data.fullImagePath;
  //     delete data.imagePath;

  //     this.setState({
  //       hasScanned: true,
  //       result: data,
  //       imagePath,
  //       fullImagePath
  //     });
  //   } catch (error) {
  //     if (error.message !== 'Canceled') {
  //       console.log(error.message);
  //       alert(error)
  //     }
  //   }
  // };

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

    let licensePlateId = "";
    const str = data;
    if (str.length < 17 || str.length > 20) {
        licensePlateId = "Error: string length must be between 17 and 20";
    } else if (str.length === 17) {
        licensePlateId = str;
    } else if (str.length === 18) {
        licensePlateId = str.slice(1);
    } else if (str.length === 19) {
        licensePlateId = str.slice(1, -1);
    } else if (str.length === 20) {
        licensePlateId = str.slice(2, -1);
    }

    this.setState({
        hasScanned: true,
        result: data,
        imagePath,
        fullImagePath,
        licensePlateId,
    });

    console.log(str);
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
      fullImagePath: '',
      licensePlateId: ''
    });
  };

  render() {
    const {
        hasScanned,
        result,
        imagePath,
        fullImagePath,
        licensePlateId
    } = this.state;

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasScanned) {
        this.emptyResult();
        return true;
      } else {
        BackHandler.exitApp();
      }
    });

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
                  licensePlateId={licensePlateId}
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