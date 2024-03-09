import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = props => {
  let patientData = null;
  let doctorData = null;

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // useEffect(() => {

  //   getData();

  // }, [])

  const setasyncData = async () => {
    await AsyncStorage.setItem('email', email);
  };

  const getData = async () => {
    const data = await database()
      .ref('Patients')
      .orderByChild('Email')
      .equalTo(email)
      .once('value')
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

    const Data = await database()
      .ref('Doctors')
      .orderByChild('Email')
      .equalTo(email)
      .once('value')
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

    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);

      setasyncData();

      if (email == 'admin123@gmail.com') {
        props.navigation.dispatch(StackActions.replace('Admin'));
      } else if (patientData && user.user.emailVerified) {
        console.log('A');
        props.navigation.dispatch(StackActions.replace('Dashboard'));
      } else if (doctorData && user.user.emailVerified) {
        console.log('B');
        props.navigation.dispatch(StackActions.replace('DoctorDashboard'));
      } else {
        Alert.alert('Please verify your email');
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        props.navigation.dispatch(StackActions.replace('login'));
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View>
        <Image style={styles.stretch} source={require('../assets/logo.png')} />
      </View>
      <View>
        <Text style={styles.heading}>Login To Your Account </Text>
      </View>
      <View style={styles.box1}>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={value => setEmail(value)}
          value={email}></TextInput>
      </View>

      <View style={styles.box1}>
        <TextInput
          style={styles.input2}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}></TextInput>
      </View>
      <View style={styles.checkboxcontainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setChecked(!isChecked)}>
          <View style={styles.checkboxInner}>
            {isChecked && <View style={styles.checkboxIcon} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Remember me</Text>
      </View>
      <View style={styles.signin}>
        <TouchableOpacity onPress={() => getData()} style={styles.btn}>
          <Text style={{color: 'white', fontSize: 16}}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Forgetpass')}>
        <Text style={styles.pass}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text style={styles.dont}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
          <Text style={styles.endtext}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
    fontFamily: 'poppins',
    color: 'black',
  },
  input1: {
    borderWidth: 1,
    height: 50,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#ECE0E0',
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  input2: {
    borderWidth: 1,
    height: 50,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#ECE0E0',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxcontainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 5,
    height: 17,
    marginBottom: 5,
  },
  checkboxInner: {
    borderWidth: 1,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    backgroundColor: 'red',
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  btn: {
    backgroundColor: '#d34b4b',
    width: 236,
    height: 53,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pass: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    color: 'black',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endtext: {
    color: 'red',
    marginLeft: 8,
  },
  container: {
    marginTop: 120,
    paddingBottom: 200,
    flexGrow: 1,
    alignItems: 'center',
  },
  dont: {
    color: 'black',
  },
});
