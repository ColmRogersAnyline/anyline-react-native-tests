import React from 'react';
import {
Button,
Image,
ScrollView,
StyleSheet,
Text,
View,
Dimensions,
Platform
} from 'react-native';
import {flattenObject} from './utils/utils';

const withoutImagePaths = value =>
value !== 'imagePath' && value !== 'fullImagePath';

export default function Result({
    result,
    imagePath,
    fullImagePath,
    emptyResult,
    hasBackButton,
    }) {

    let fullImage = <View />;
    let fullImageText = <View />;
    if (fullImagePath && fullImagePath !== '') {
    fullImage = (
        <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{uri: `file://${fullImagePath}`}}
        />
    );
    fullImageText = <Text style={styles.text}>Scanned Image</Text>;
    }
    const flattenResult = flattenObject(result);

    let BackButton = <View />;
    if (hasBackButton) {
    BackButton = (
        <View style={styles.backButton}>
        <Button title={'Back'} onPress={emptyResult} />
        </View>
    );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            {fullImageText}
            {fullImage}

            <Text style={styles.text}>Cutout:</Text>
            <Image
                style={styles.image}
                resizeMode={'contain'}
                source={{uri: `file://${imagePath}`}}
            />
            {Object.keys(flattenResult)
                .filter(withoutImagePaths)
                .map((value, key) => {
                return  (
                    <View style={styles.resultContainer} key={`Result_Label_${key}`}>
                      <Text
                          style={styles.textResultLabel}>
                          {value}:
                      </Text>
                      <Text style={styles.textResult} key={`Result_Text_${key}`}>
                          {flattenResult[value]}
                      </Text>
                    </View>
                );
                })}
                { Platform.OS === 'android' }
                { Platform.OS === 'ios'}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 300,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0099ff',
        marginBottom: 20,
        marginTop: 50,
    },
    resultContainer: {
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        alignContent: 'flex-end',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    text: {
        color: 'white',
        alignContent: 'flex-end',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: 5,
    },
    textResult: {
        color: 'white',
        alignContent: 'flex-end',
        marginTop: 2,
        marginRight: '10%',
    },
    textResultLabel: {
        color: 'white',
        alignContent: 'flex-end',
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 20,
    },
    scrollContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    backButton: {
        marginTop: 25,
        width: Dimensions.get('window').width/4,
        alignSelf: 'center',
    },
    titleText: {
        color: '#0099FF',
        fontSize: 20
    },
});
  

  