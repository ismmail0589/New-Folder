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


const Admin_ViewProfileDoctor = () => {

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


  useEffect(() => {
    getData();

  }, [])


  const getData = async () => {
    try {

      const Full_Name = await AsyncStorage.getItem('Full_Name');
      const Title = await AsyncStorage.getItem('Title');
      const Email = await AsyncStorage.getItem('Email');
      const Experience = await AsyncStorage.getItem('Experience');
      const YearofGraduation = await AsyncStorage.getItem('YearofGraduation');
      const GraduationInstitute = await AsyncStorage.getItem('GraduationInstitute');
      const About = await AsyncStorage.getItem('About');
      const Dutytime = await AsyncStorage.getItem('Dutytime');
      const image = await AsyncStorage.getItem('image');


      setName(Full_Name); // Format the time
      setEmail(Email);
      setTitle(Title);
      setExperience(Experience)
      setYearofGraduation(YearofGraduation);
      setGraduationInstitute(GraduationInstitute);
      setAbout(About);
      setDutyTime(Dutytime);
      setImageData(image);
    } catch (err) {
      console.log(err);
    }
  };

  const setasyncData = async () => {

    await AsyncStorage.setItem('first', first)

  }

  const getFAsyncData = async () => {

    GetFirst = await AsyncStorage.getItem('first')



    console.warn('lll', GetFirst)


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
        {imageData
          ?
          <Image source={{ uri:imageData }} style={styles.imageupload} />
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
            <TextInput style={styles.NameImageText} placeholder={'Dr. ' + name} placeholderTextColor="black"  onChangeText={(value) => setName(value)} value={name} />
            <TextInput style={styles.title} placeholder={title} placeholderTextColor="black" onChangeText={(value) => setTitle(value)} value={title} />
            </View>
          </View>


          <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop:20 }}>

          <View style={styles.Exp}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black'}}>Experience</Text>
            <TextInput style={styles.ExpText} placeholder={experience} placeholderTextColor="black"  onChangeText={(value) => setExperience(value)} value={experience} />
          </View>

          <View style={styles.YearofGraduation}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black', textAlign:'center'}}>Graduation Year</Text>
            <TextInput style={styles.YearofGraduationText} placeholder={yearofgraduation} placeholderTextColor="black"  onChangeText={(value) => setYearofGraduation(value)} value={yearofgraduation} />
          </View>

          <View style={styles.GraduationInstitute}>
            <Text style = {{fontSize:16, fontWeight:'bold', color:'black', textAlign:'center'}}>Graduation Institute</Text>
            <TextInput style={styles.GraduationInstituteText} placeholder={graduationinstitute} placeholderTextColor="black"  onChangeText={(value) => setGraduationInstitute(value)} value={graduationinstitute} />
          </View>

          </View>

          <View style={styles.EmailContainer}>
            <TextInput style={styles.EmailText} placeholder={email} placeholderTextColor="black"  onChangeText={(value) => setEmail(value)} value={email} />
          </View>

          <Text style={{ marginRight: 300, fontSize: 18, color: 'black', marginTop: 28, fontWeight: 'bold' }}>About</Text>
          <View style={styles.AboutContainer}>
            <TextInput style={styles.input2} placeholder={about} multiline={true} placeholderTextColor="black"  onChangeText={(value) => setAbout(value)} value={about} />
          </View>

          <Text style={{ marginRight: 265, fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 8 }}>Availability</Text>
          <View style={styles.AvailabilityInfo}>
            <TextInput style={styles.AvailabilityText} placeholder={dutytime} placeholderTextColor="black"  onChangeText={(value) => setDutyTime(value)} value={dutytime} />
          </View>
        </View>
      </ScrollView>
    

    </View>
  );
}

export default Admin_ViewProfileDoctor;

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
