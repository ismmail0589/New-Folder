import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Admin_ViewDoctorsList = (props) => {

  const [doctorlist, setDoctorList] = useState(null);

  useEffect(() => {

    getData();

  }, [])


  const getSpecificDoctor = async (itemIndex) => {
    try {
      const dataPatient = await database().ref(`Doctors/${itemIndex}`).on('value', tempdata => {

        // setPatientList(tempdata.val())

        AsyncStorage.setItem('Full_Name', tempdata.val().Full_Name)
        AsyncStorage.setItem('Title', tempdata.val().Title)
        AsyncStorage.setItem('Email', tempdata.val().Email)
        AsyncStorage.setItem('Experience', tempdata.val().Experience)
        AsyncStorage.setItem('YearofGraduation', tempdata.val().YearofGraduation)
        AsyncStorage.setItem('GraduationInstitute', tempdata.val().GraduationInstitute)
        AsyncStorage.setItem('About', tempdata.val().About)
        AsyncStorage.setItem('Dutytime', tempdata.val().Dutytime)
        AsyncStorage.setItem('image', tempdata.val().image)

        props.navigation.navigate('Admin_ViewProfileDoctor')
      });

    }
    catch (err) {
      console.log(err)
    }
  };

  const handleLogout = async () => {

    try {
      await Auth().signOut();
      
      props.navigation.dispatch(
        StackActions.replace('login')
      );

    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const dataPatient = await database().ref("Doctors").on('value', tempdata => {

        setDoctorList(tempdata.val())

      });

    }
    catch (err) {
      console.log(err)
    }
  };

  const handleDelete = (itemIndex, itemValue) => {
    
    try {
      Alert.alert('Alert', `Are you sure to delete ${itemValue}`, [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await database().ref(`Doctors/${itemIndex}`).remove();
          }

        }
      ])

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <View style={styles.Doctors}>

      <FlatList
        data={doctorlist}
        renderItem={(item) => {
          const itemIndex = item.index;
          if (item.item !== null) {
            return (
              <TouchableOpacity onPress={()=>getSpecificDoctor(itemIndex)}>
              <View style={styles.Doctor1}>
                <View>
                <Image source={{ uri: item.item.image.uri }} style={styles.stretch} />
                </View>
                <View style={styles.Doctor1Text}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.item.Full_Name}</Text>

                  <Text style={{ marginLeft: 8, fontSize: 15, color: 'black' }}>{item.item.Title} </Text>
                  <View style={styles.Removebtn}>
                    <TouchableOpacity onPress={() => handleDelete(itemIndex, item.item.Full_Name)}>
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: 16,
                          paddingTop: 5,
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            );
          }
        }}
      />


      <Button title='logout' onPress={() => handleLogout()}>

      </Button>

    </View>
  );
}


export default Admin_ViewDoctorsList;

const styles = StyleSheet.create({
  Doctors: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1
  },
  Doctor1: {
    flexDirection: 'row',
    height: 104,
    width: 341,
    backgroundColor: '#DCD8D8',
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
  },
  stretch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: 0.2,
  },
  Doctor1Text: {
    marginTop: 5,
    marginLeft: 10

  },
  Removebtn: {
    backgroundColor: 'black',
    borderRadius: 14,
    width: 100,
    height: 38,
    marginLeft: 155,
    marginTop: 14,
    borderRadius: 14
  },
});
