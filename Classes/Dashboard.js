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

export const Dashboard = ({navigation}) => {
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);
  let Email = null;

  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };

  const getAsyncData = async () => {
    Email = await AsyncStorage.getItem('email');
  };

  useEffect(() => {
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
                'Please complete your profile: Enter Disease',
                '',
                [
                  {
                    text: 'OK',
                    onPress: () => handleNavigation('EditProfile'),
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
            marginTop: 50,
          }}>
          {' '}
          Medical Checks !
        </Text>

        <Text
          style={{
            color: 'white',
            marginTop: 25,
            alignItems: 'center',
            fontSize: 20,
          }}>
          {' '}
          Check your health condition{' '}
        </Text>
        <Text style={{color: 'white', fontSize: 20}}>
          {' '}
          regularly to avoid any mishap
        </Text>

        <View style={styles.imageandbutton}>
          <View style={styles.BookAppointmentViewbtn}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                marginTop: 55,
                marginLeft: 8,
                width: 113,
                height: 37,
              }}
              onPress={() => handleNavigation('Detector')}>
              <Text
                style={{
                  color: '#d34b4b',
                  textAlign: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  padding: 5,
                }}>
                Check Now
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              style={styles.stretch}
              source={require('../assets/image1.png')}
            />
          </View>
        </View>
      </View>

      <View style={styles.ReportsContainer}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 10,
            color: 'black',
          }}>
          Reports
        </Text>
        <View style={styles.Viewall}>
          <TouchableOpacity  onPress={() => handleNavigation('ViewReports')}>
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
        <TouchableOpacity  style={styles.downloadicon} onPress={() => handleNavigation('ViewReports')}>
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
        <TouchableOpacity style={styles.downloadicon1} onPress={() => handleNavigation('ViewReports')}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  ReportsContainer: {
    marginTop: 60,
  },

  Dashboard: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },

  medicalcheck: {
    height: 260,
    width:360,
    backgroundColor: '#d34b4b',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 25,
    borderRadius: 10,
    justifyContent: 'center',
  },

  stretch: {
    width: 160,
    height: 165,
    marginLeft: 75,
    marginBottom: 60,
    marginTop: -32,
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
