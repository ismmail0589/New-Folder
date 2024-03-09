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
  KeyboardAvoidingView,

} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';


const DoctorEditBio = () => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [title, setTitle] = useState(null);
  const [yearofgraduation, setYearofGraduation] = useState(null);
  const [graduationinstitute, setGraduationInstitute] = useState(null);
  const [about, setAbout] = useState(null);
  const [experience, setExperience] = useState(null);
  const [dutytime, setDutyTime] = useState(null);
  const [imageData, setImageData] = useState(null);

  const [first, setFirst] = useState('No');

  let Email = null;
  let GetFirst = null;

  const [doctorlist, setDoctorList] = useState(null);

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
    console.log('2', Email);

  }

  const getData = async () => {
    try {
      const snapshot = await database().ref('Doctors').orderByChild('email').equalTo(Email).once('value');

      if (snapshot.exists()) {
        const doctorData = snapshot.val();
        console.log("Doctor Data:", doctorData); // Log doctorData to see its structure
        if (Array.isArray(doctorData)) {
          doctorData.forEach(obj => {
            if (obj.Email == Email) {
              setDoctorList(obj)
            }
          });
        } else {
          console.log("Doctor Data is not an array:", doctorData);
        }
      } else {
        console.log('No data found for the specified email.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const handleUpdateProfile = () => {

    setBtn('S');
    setEditable(true);


  }

  const handleSaveandUpdate = async () => {
    try {
      setBtn('U');
      setEditable(false);

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

        if (email) {
          database().ref(`Doctors/${key}`).update({
            Email: email
          });
        }
        if (name) {
          database().ref(`Doctors/${key}`).update({
            Full_Name: name
          });
        }
        if (experience) {
          database().ref(`Doctors/${key}`).update({
            Experience: experience
          });
        }

        if (yearofgraduation) {
          database().ref(`Doctors/${key}`).update({
            YearofGraduation:yearofgraduation
          });
        }
        if (graduationinstitute) {
          database().ref(`Doctors/${key}`).update({
            GraduationInstitute:graduationinstitute
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

        <KeyboardAvoidingView behavior="padding" style={styles.container}></KeyboardAvoidingView>

        <View style={styles.inputContainer}>

          <View style={styles.NameImageContainer}>
            {GetFirst == null ? <AfterFirstUpload /> : <FirstimeUpload />}
            <View>
            <TextInput style={styles.NameImageText} placeholder={doctorlist ? 'Dr. ' + doctorlist.Full_Name : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setName(value)} value={name} />
            <TextInput style={styles.title} placeholder={doctorlist ? doctorlist.Title : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setTitle(value)} value={title} />
            </View>
          </View>


          <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop:20 }}>

          <View style={styles.Exp}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black'}}>Experience</Text>
            <TextInput style={styles.ExpText} placeholder={doctorlist ? doctorlist.Experience : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setExperience(value)} value={experience} />
          </View>

          <View style={styles.YearofGraduation}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black', textAlign:'center'}}>Graduation Year</Text>
            <TextInput style={styles.YearofGraduationText} placeholder={doctorlist ? doctorlist.YearofGraduation : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setYearofGraduation(value)} value={yearofgraduation} />
          </View>

          <View style={styles.GraduationInstitute}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black', textAlign:'center'}}>Graduation Institute</Text>
            <TextInput style={styles.GraduationInstituteText} placeholder={doctorlist ? doctorlist.GraduationInstitute : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setGraduationInstitute(value)} value={graduationinstitute} />
          </View>

          </View>

          <View style={styles.EmailContainer}>
            <TextInput style={styles.EmailText} placeholder={doctorlist ? doctorlist.Email : null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setEmail(value)} value={email} />
          </View>

          <Text style={{ marginRight: 300, fontSize: 18, color: 'black', marginTop: 28, fontWeight: 'bold' }}>About</Text>
          <View style={styles.AboutContainer}>
            <TextInput style={styles.input2} placeholder={doctorlist ? doctorlist.About : null} multiline={true} placeholderTextColor="black" editable={editable} onChangeText={(value) => setAbout(value)} value={about} />
          </View>

          <Text style={{ marginRight: 265, fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 8 }}>Availability</Text>
          <View style={styles.AvailabilityInfo}>
            <TextInput style={styles.AvailabilityText} placeholder={doctorlist ? doctorlist.Dutytime: null} placeholderTextColor="black" editable={editable} onChangeText={(value) => setDutyTime(value)} value={dutytime} />
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

export default DoctorEditBio;

const styles = StyleSheet.create({

  imageupload: {
    height: 90,
    width: 90,
    borderRadius: 30,
    backgroundColor: '#ECE0E0',
    borderWidth: 0.2,
    borderColor: 'black',
    marginTop: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'


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
  NameImageText: {
    color: 'black',
    marginBottom: 60,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5
  },
  AvailabilityText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 5
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
  },
  AboutContainer: {

    height: 94,
    width: 344,
    borderRadius: 14,
    marginTop: 12,
    marginRight: 10,
   
    backgroundColor: '#ECE0E0'

  },
  AvailabilityInfo: {
    
    height: 80,
    width: 340,
    borderRadius: 20,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    alignItems:'center',
    justifyContent:'center'

  },
  NameImageContainer: {
   
    height: 110,
    width: 340,
    borderRadius: 25,
    marginTop: 2,
    backgroundColor: '#ECE0E0',

    flexDirection: 'row'
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
  title:{
    marginTop:-60,
    marginLeft:10,
    fontSize:16
  },
  Exp:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 110,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
    flexDirection:'column'

  },
  ExpText:{
    color: 'black',
    textAlign: 'center',
  },
  YearofGraduation:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 110,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
    flexDirection:'column',
    alignItems:'center'

  },
  YearofGraduationText:{
    color: 'black',
    textAlign: 'center',
    alignSelf:'center'
  },
  GraduationInstitute:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 110,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
    flexDirection:'column'

  },
  GraduationInstituteText:{
    color: 'black',
    textAlign: 'center',
  },
  EmailContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 324,
    borderRadius: 14,
    marginTop: 28,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',

  },
  EmailText:{
    color: 'black',
    textAlign: 'center',
  }
  
});
