import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Doctor_Dashboard = ({navigation}) => {
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);
  let Email = null;

  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };

  const getAsyncData = async () => {
    Email = await AsyncStorage.getItem('email');
    console.log(Email);
  };

  useEffect(() => {
    console.log('zz')
    getAsyncData();
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        const userUid = user.uid;

        const userRef = database().ref(`/FirstTimeLogin/${userUid}`);
        userRef
          .once('value')
          .then(snapshot => {
            const userData = snapshot.val();
            const isFirstTimeLogin = !userData || !userData.firstTimeLogin;

            if (isFirstTimeLogin) {
              userRef.update({
                firstTimeLogin: true,
                Email: Email,
              });

              Alert.alert(
                'Please complete your profile',
                '',
                [
                  {
                    text: 'OK',
                    onPress: () => handleNavigation('DoctorAddbio'),
                  },
                ],
              );
            }

            setFirstTimeLogin(isFirstTimeLogin);
          })
          .catch(error => {
            console.error('Error checking firstTimeLogin:', error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.Dashboard}>
      <View style={styles.medicalcheck}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 34,
            color: 'white',
            marginLeft: 10,
            marginTop: 70,
          }}>
         
          BDD
        </Text>

        <Text
          style={{
            color: 'white',
            marginTop: 12,
            marginLeft:12,
            alignItems: 'center',
            fontSize: 20,
          }}>
          
          All knowlege attains its  ethical value and its human significance only {'\n'} 
          by the human sense in which it {'\n'}is employed.{' '}
        
        </Text>

        <View style={styles.imageandbutton}>
     
          <View>
            <Image
              style={styles.stretch}
              source={require('../assets/image1.png')}
            />
          </View>
        </View>
      </View>

      <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 60,
            marginLeft: 14,
            color: 'black',
          }}>
          Upcoming Appointments
        </Text>
        <View style={styles.Viewall}>
          <TouchableOpacity>
            <Text
              style={{
                color: '#d34b4b',
                textAlign: 'center',
                alignItems: 'center',
                fontSize: 16,
                marginTop: -23,
                marginLeft: 300,
                fontWeight:'bold'
              }}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

      <View style={styles.AppointmentsContainer}>
       
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  AppointmentsContainer: {
    width:300,
    height: 140,
    backgroundColor: '#d34b4b',
    marginTop: 20,
    marginLeft: 12,
    marginRight: 25,
    borderRadius: 40,
    justifyContent: 'center',
  },

  Dashboard: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },

  medicalcheck: {
    width:370,
    height: 260,
    backgroundColor: '#d34b4b',
    marginTop: 50,
    marginLeft: 12,
    marginRight: 25,
    borderRadius: 10,
    justifyContent: 'center',
  },

  stretch: {
    width: 140,
    height: 145,
    marginLeft: 230,
    marginBottom: 60,
    marginTop: -52,
  },

  imageandbutton: {
    flexDirection: 'row',
  },

  history: {
    flexDirection: 'row',
  },

  reports: {
    flexDirection: 'row',
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
    borderColor: 'black',
  },
});
