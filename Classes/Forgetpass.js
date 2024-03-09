import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';

function Forgot(props) {

  const [email, setEmail] = useState('');
 
  const sendPassResetEmail = async()=>{
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');

      setEmail('')
        
    } catch (error) {
        console.log(error)
    }
}


  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.stretch} source={require('../assets/logo.png')} />
      </View>
      <View>
        <Text style={styles.heading}>Forgot Password</Text>
      </View>
      
      <View style={styles.box1}>
        <TextInput style={styles.input1} placeholder="Enter email" 
        onChangeText={(value)=>setEmail(value)}
        value={email}
        />
      </View>
      <TouchableOpacity style={styles.send} onPress={()=> sendPassResetEmail()}>
        <Text style={{fontWeight: 'bold', color:'white'}}>Send Rest Emal</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Forgot;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
  },
  heading2: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 19,
    marginBottom: 19,
  },
  input1: {
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 14,
    marginTop: 15,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#E2D4D4',
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: 375,
    height: 144,
    alignSelf: 'center',
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#d34b4b',
    width: 250,
    height: 40,
    borderRadius: 14,
    alignSelf: 'center',
  },
});
