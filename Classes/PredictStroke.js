import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Check({ navigation }) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  return (
    <View style={styles.container}>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    position: 'relative',
  },

});
