import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Check({navigation}) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  return (
    <View style={styles.container}>
      <View style={styles.detect}>
        <TouchableOpacity
          onPress={() => handleNavigation('Alzheimer_det')}
          style={styles.btn}>
          <Text style={styles.textbtton}>Detect Alzheimer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detect}>
        <TouchableOpacity
          onPress={() => handleNavigation('MultipleSclerosis_det')}
          style={styles.btn}>
          <Text style={styles.textbtton}>Detect Multiple Sclerosis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detect}>
        <TouchableOpacity
          onPress={() => handleNavigation('Tumor_det')}
          style={styles.btn}>
          <Text style={styles.textbtton}>Detect Tumor</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
          color: 'black',
        }}>
        Results
      </Text>

      <View style={styles.Viewall}>
        <TouchableOpacity>
          <Text
            style={{
              color: '#d34b4b',
              textAlign: 'center',
              alignItems: 'center',
              fontSize: 16,
              marginTop: -20,
              marginLeft: 300,
            }}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.downloadicon}>
        <Image
          source={require('../assets/ReportIcon.png')}
          style={{
            alignSelf: 'center',
            height: 0.15,
            width: 0.15,
            top: 10,
            padding: 15,
            paddingLeft: 5,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadicon1}>
        <Image
          source={require('../assets/ForwardIcon.png')}
          style={{
            alignSelf: 'center',
            height: 0.15,
            width: 0.15,
            top: 10,
            padding: 15,
            paddingLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#d34b4b',
    width: 257,
    height: 67,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  detect: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbtton: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  downloadicon: {
    backgroundColor: '#D34B4B',
    borderRadius: 190,
    width: 52,
    height: 52,
    left: 10,
    bottom: -10,
    borderColor: 'black',
  },
  downloadicon1: {
    backgroundColor: '#ffffff',
    borderRadius: 190,
    width: 52,
    height: 52,
    left: 80,
    bottom: 40,
  },
});
