import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(props) {

  let patientData = null;
  let doctorData = null;

  useEffect(() => {
    setTimeout(async () => {
      const unsubscribe = await Auth().onAuthStateChanged(users => {

        if (users == null) {
          props.navigation.dispatch(
            StackActions.replace('splash')
          );
        }
        else {
          getData(users.email)

        }

      });
      return () => unsubscribe();
    }, 3000);
  }, []);

  const getData = async (email) => {

    const data = await database().ref('Patients').orderByChild('Email').equalTo(email).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {

          patientData = snapshot.val();
          console.log('PD', patientData);

        } else {
          console.log('No data found for the specified email.');
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });

    const Data = await database().ref('Doctors').orderByChild('Email').equalTo(email).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {

          doctorData = snapshot.val();
          console.log('DD', doctorData);

        } else {
          console.log('No data found for the specified email.');
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });

      if (email == 'admin123@gmail.com') {
        props.navigation.dispatch(
          StackActions.replace('Admin')
        );
      }

      else if (patientData) {
        props.navigation.dispatch(
          StackActions.replace('Dashboard')
        );
      }
      else if (doctorData) {
        console.log('idr aa gya')
        props.navigation.dispatch(
          StackActions.replace('DoctorDashboard')
        );
      }
      else{
        props.navigation.dispatch(
          StackActions.replace('splash')
        );
      }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.loader}>
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 140,
  },
  container: {
    marginTop: 100,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    marginLeft: 110,
    height: 180,
    width: 160,
  },
});
