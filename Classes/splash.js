import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
export default function App({navigation}) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  return (
    <View>
      <Image style={styles.image1} source={require('../assets/Welcome.png')} />
      <View style={styles.container}>
        <View>
          <Image style={styles.image2} source={require('../assets/logo.png')} />
          <Image
            style={styles.image3}
            source={require('../assets/text_brain.png')}
          />
          <Image
            style={styles.image4}
            source={require('../assets/text2_brain.png')}
          />
        </View>
        <View style={styles.Started}>
          <TouchableOpacity
            onPress={() => handleNavigation('login')}
            style={styles.btn}>
            <Text style={styles.textB}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image1: {
    width: 120,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  image2: {
    width: 375,
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  image3: {
    width: 240,
    height: 95,
    marginLeft: 22,
    marginBottom: 40,
  },
  image4: {
    width: 167,
    height: 53,
    marginLeft: 22,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: '#d34b4b',
    width: 296,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  Started: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textB: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  container: {
    marginTop: 100,
  },
});
