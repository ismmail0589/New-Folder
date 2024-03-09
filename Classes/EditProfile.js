import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView, 
  KeyboardAvoidingView 
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';


const EditProfile = () => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDOB] = useState(null);
  const [disease, setDisease] = useState(null);
  const [phone, setPhone] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [first, setFirst] = useState('No');



  let Email = null;
  let GetFirst = null;

  const [patientlist, setPatientList] = useState(null);

  const [editable, setEditable] = useState(false);
  const [btn, setBtn] = useState('U');


  useEffect(() => {


    getAsyncData();
    getData();

    console.log('e', Email)

  }, [])

  const setasyncData = async () => {

    await AsyncStorage.setItem('first', first)

  }

  const getFAsyncData = async () => {

    GetFirst = await AsyncStorage.getItem('first')



    console.warn('lll', GetFirst)


  }

  const ImagePick = async () => {

    try {

      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images]
      })

      setImageData(response);
      setasyncData();
      getFAsyncData();
      console.log(response);



      UploadImage(response);

    }
    catch (err) {
      console.log(err);
    }
  }

  const UploadImage = async (imageData) => {
    try {
      const response = await storage().ref(`/ProfileImage/${imageData.name}`).putFile(imageData.uri)
      
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAsyncData = async () => {
    Email = await AsyncStorage.getItem('email')

  }

  const getData = async () => {

    const data = await database().ref('Patients').orderByChild('email').equalTo(Email).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {

          const patientData = snapshot.val();
          patientData.forEach(obj => {

            if (obj.Email == Email) {
              setPatientList(obj)

            }
          })
        } else {
          console.log('No data found for the specified email.');
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });


  };

  const handleUpdateProfile = () => {

    setBtn('S');
    setEditable(true);


  }

  const handleSaveandUpdate = async () => {
    try {
      setBtn('U');
      setEditable(false);

      const snapshot = await database().ref('Patients').orderByChild('email').equalTo(Email).once('value');

      if (snapshot.exists()) {

        const patientData = snapshot.val();
        let key = 0;
        let i = -1;
        patientData.forEach(obj => {
          i++;
          if (obj.Email == Email) {
            setPatientList(obj)
          }
          key = i;
        })

        if (email) {
          database().ref(`Patients/${key}`).update({
            Email: email
          });
        }
        if (name) {
          database().ref(`Patients/${key}`).update({
            Full_Name: name
          });
        }
        if (disease) {
          database().ref(`Patients/${key}`).update({
            Disease: disease
          });
        }

        if (dob) {
          database().ref(`Patients/${key}`).update({
            DOB: dob
          });
        }

        if (phone) {
          database().ref(`Patients/${key}`).update({
            Phone_Number: phone
          });
        }
        if (imageData) {
          database().ref(`Patients/${key}`).update({
            image: imageData
          });
        }



      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const FirstimeUpload = () => {
    console.log('yai h');
    return (
      <View>

        <View style={styles.imageupload}>
          <TouchableOpacity onPress={() => ImagePick()} >
            <AntDesign name='addfile' size={25} color='black' />
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const AfterFirstUpload = () => {
    console.log('yaaaa yai h');
    return (
      <View>
        {patientlist
          ?
          <Image source={{ uri: patientlist.image.uri }} style={styles.imageupload} />
          :
          <View style={styles.imageupload}>
            <TouchableOpacity onPress={() => ImagePick()} >
              <AntDesign name='addfile' size={25} color='black' />
            </TouchableOpacity>
          </View>}
      </View>
    )
  }

  return (
    <View style={styles.containerEditProfile}>

<ScrollView>
      {GetFirst == null ? <AfterFirstUpload /> : <FirstimeUpload />}
      <KeyboardAvoidingView behavior="padding" style={styles.container}></KeyboardAvoidingView>

      <View style={styles.inputContainer}>

        <Text style={{ marginRight: 220, fontSize: 16, color: 'black' }}>Full Name</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder={patientlist ? patientlist.Full_Name : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setName(value)} value={name} />
        </View>

        <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>Email</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder={patientlist ? patientlist.Email : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setEmail(value)} value={email} />
        </View>
        <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>DOB</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder={patientlist ? patientlist.DOB : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setDOB(value)} value={dob} />
        </View>
        <Text style={{ marginRight: 235, fontSize: 16, color: 'black', marginTop: 8 }}>Disease</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder={patientlist ? patientlist.Disease : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setDisease(value)} value={disease} />
        </View>
        <Text style={{ marginRight: 190, fontSize: 16, color: 'black', marginTop: 8 }}>Phone Number</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder={patientlist ? patientlist.Phone_Number : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setPhone(value)} value={phone} />
        </View>
      </View>
      </ScrollView>
      {btn == 'U' ? <View style={styles.Update}>
        <TouchableOpacity style={styles.btn} onPress={() => handleUpdateProfile()}>
          <Text style={styles.Text}>Update</Text>
        </TouchableOpacity>
      </View> :

        <View style={styles.OK}>
          <TouchableOpacity style={styles.btn} onPress={() => handleSaveandUpdate()}>
            <Text style={styles.Text}>Save</Text>
          </TouchableOpacity>
        </View>}

        

    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({

  imageupload: {
    height: 83,
    width: 83,
    borderRadius: 41.5,
    backgroundColor: '#ECE0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginLeft: 140

  },
  txt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16

  },

  input2: {
    color: 'black',
    textAlign: 'center',
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#d34b4b',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  Update: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    marginTop: -60
  },
  OK: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    marginTop: -60
  },
  containerEditProfile: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 4,
    alignItems: 'center'
  },
  List: {
    marginTop: 10,
    alignItems: 'center'
  },
  stretch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
    marginBottom: 25,
  },
  Text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
