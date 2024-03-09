import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';

export default function Check({navigation}) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  const [filePath, setFilePath] = useState(null);
  const [pred, setPred] = useState(null);

  const loadModel = async () => {
    const modelJSON = require('../schlorosis/model.json');
    const modelWeights = require('../schlorosis/weights.bin');

    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJSON, modelWeights),
    );
    console.log('Model loaded successfully');
    return model;
  };

  const transformImageToTensor = async uri => {
    const img64 = uri.base64;
    const raw = new Uint8Array(tf.util.encodeString(img64, 'base64').buffer);
    let imgTensor = decodeJpeg(raw);

    // Resize the image
    imgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]);

    // Normalize the pixel values to the range [0, 1]
    imgTensor = imgTensor.div(tf.scalar(255));

    // Reshape the tensor to have a batch size of 1
    imgTensor = imgTensor.reshape([1, 224, 224, 3]);

    return imgTensor;
  };

  const makePredictions = async (model, image) => {
    const predictionsData = await model.predict(image);
    const topPredictionIndex = await predictionsData.argMax(1).dataSync()[0];
    const topProbability = await predictionsData.max(1).dataSync()[0];
    console.log(
      'Top Prediction:',
      topPredictionIndex,
      'Probability:',
      topProbability,
    );

    // Return the top prediction index and probability
    return {index: topPredictionIndex, probability: topProbability};
  };

  const getPredictions = async () => {
    await tf.ready();
    const model = await loadModel();

    if (model && filePath) {
      const imageTensor = await transformImageToTensor(filePath);
      const predictions = await makePredictions(model, imageTensor);
      // Handle predictions as needed
      console.log('Predictions:', predictions);

      setPred(predictions);
      navigation.navigate('Sclerosis_Report', predictions);
    } else {
      console.log('Model or image not available.');
    }
  };

  const selectImage = () => {
    setFilePath(null);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 1,
      includeExtra: true,
      includeBase64: true,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error:', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button:', res.customButton);
      } else {
        setFilePath(res.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '55%'}}>
        <View style={styles.InsertImageContainer}>
          <Image
            style={styles.uploadImage}
            resizeMode="contain"
            source={{
              uri: filePath
                ? filePath.uri
                : 'https://icon-library.com/images/file-upload-icon/file-upload-icon-22.jpg',
            }}
          />
          <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
            <Text style={styles.label}>
              {filePath ? 'CHANGE' : 'CHOOSE'} IMAGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {filePath ? (
        <TouchableOpacity
          onPress={getPredictions}
          // onPress={() => handleNavigation('Report')}
          style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InsertImageContainer: {
    alignSelf: 'center',
    padding: 8,
    height: 300,
    width: 250,
    backgroundColor: '#d34b4b',
    marginTop: 40,
    position: 'relative',
    borderRadius: 8,
  },
  uploadImage: {
    width: '100%',
    height: '100%',
  },
  selectImage: {
    width: '60%',
    backgroundColor: 'gray',
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    padding: 15,
    color: '#fff',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#d34b4b',
    width: 90,
    padding: 10,
    borderRadius: 15,
    marginTop: 25,
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
