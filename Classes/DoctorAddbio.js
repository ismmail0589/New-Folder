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


const DoctorAddbio = () => {

  const [title, setTitle] = useState(null);
  const [yearofgraduation, setYearofGraduation] = useState(null);
  const [graduationinstitute, setGraduationInstitute] = useState(null);
  const [about, setAbout] = useState(null);
  const [experience, setExperience] = useState(null);
  const [dutytime, setDutyTime] = useState(null);
  
  
  const [first, setFirst] = useState('No');



  let Email = null;
  let GetFirst = null;

  const [doctorlist, setDoctorList] = useState(null);

  const [editable, setEditable] = useState(false);
  const [btn, setBtn] = useState('U');


  useEffect(() => {

    getAsyncData();

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


  const handleSaveandUpdate = async () => {

    console.log('Method called');
    try {

      const snapshot = await database().ref('Doctors').orderByChild('email').equalTo(Email).once('value');

      if (snapshot.exists()) {

        const doctorData = snapshot.val();
        let key = 0;
        let i = -1;
        doctorData.forEach(obj => {
          i++;
          if (obj.Email == Email) {
            setDoctorList(obj)
          }
          key = i;
        })

        if (title) {
          database().ref(`Doctors/${key}`).update({
            Title: title
          });
        }
        if (experience) {
          database().ref(`Doctors/${key}`).update({
            Experience: experience
          });
        }
        if (graduationinstitute) {
          database().ref(`Doctors/${key}`).update({
            GraduationInstitute: graduationinstitute
          });
        }

        if (yearofgraduation) {
          database().ref(`Doctors/${key}`).update({
            YearofGraduation: yearofgraduation
          });
        }

        if (dutytime) {
          database().ref(`Doctors/${key}`).update({
            Dutytime: dutytime
          });
        }
        if (imageData) {
          database().ref(`Doctors/${key}`).update({
            image: imageData
          });
        }
        if (about) {
            database().ref(`Doctors/${key}`).update({
              About: about
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
        {doctorlist
          ?
          <Image source={{ uri: doctorlist.image.uri }} style={styles.imageupload} />
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

        <Text style={{ marginRight: 220, fontSize: 16, color: 'black' }}>Title</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='Enter your title'   onChangeText={(value) => setTitle(value)} value={title} />
        </View>

        <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>Graduation Institue</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='Enter your graduation institute'   onChangeText={(value) => setGraduationInstitute(value)} value={graduationinstitute} />
        </View>
        <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>Graudation Year</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='Enter your year of graduation'   onChangeText={(value) => setYearofGraduation(value)} value={yearofgraduation} />
        </View>
        <Text style={{ marginRight: 235, fontSize: 16, color: 'black', marginTop: 8 }}>Experience</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='Enter your experience'   onChangeText={(value) => setExperience(value)} value={experience} />
        </View>
        <Text style={{ marginRight: 190, fontSize: 16, color: 'black', marginTop: 8 }}>Duty Timing</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='6 PM - 8 PM'   onChangeText={(value) => setDutyTime(value)} value={dutytime} />
        </View>
        <Text style={{ marginRight: 190, fontSize: 16, color: 'black', marginTop: 8 }}>About</Text>
        <View style={styles.box2}>
          <TextInput style={styles.input2} placeholder='write about yourself' multiline = {true}   onChangeText={(value) => setAbout(value)} value={about} />
        </View>
      </View>

      <View style={styles.Update}>
        <TouchableOpacity style={styles.btn} onPress={() => handleSaveandUpdate()}>
          <Text style={styles.Text}>Save</Text>
        </TouchableOpacity>
      </View> 
      </ScrollView>
     
     

        

        

    </View>
  );
}

export default DoctorAddbio;

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
    alignSelf:'center'

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
