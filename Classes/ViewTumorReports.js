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

const ViewTumorReports = (props) => {

  const [reportlist, setReportList] = useState(null);

  let Email = null;

  useEffect(() => {
    getAsyncData();


  }, [])


  const getAsyncData = async () => {
    Email = await AsyncStorage.getItem('email')
    console.log('e', Email)
    getData(Email);

  }


  const getSpecificReport = async (itemIndex) => {
    try {
      const dataPatient = await database().ref(`Reports/BrainTumor/${itemIndex}`).on('value', tempdata => {

        // setPatientList(tempdata.val())

        AsyncStorage.setItem('reportID', tempdata.val().Report_ID)
        AsyncStorage.setItem('patientEmail', tempdata.val().Patient_Email)
        AsyncStorage.setItem('date', tempdata.val().Date)
        AsyncStorage.setItem('time', tempdata.val().Time)
        AsyncStorage.setItem('description', tempdata.val().Description)

        props.navigation.navigate('DetailedTumorReport')
      });

    }
    catch (err) {
      console.log(err)
    }
  };

  const getData = async (Email) => {
    console.log("Searching for email:", Email);
    const data = await database().ref('Reports/BrainTumor')
      .orderByChild('Patient_Email')
      .equalTo(Email)
      .once('value')
      .then(snapshot => {
        console.log("Snapshot:", snapshot.val());
        if (snapshot.exists()) {
          const reportData = snapshot.val();
          console.log("RD", reportData)
          setReportList(reportData)

        } else {
          console.log('No data found for the specified email.');
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
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
            await database().ref(`Reports/BrainTumor/${itemIndex}`).remove();
          }

        }
      ])

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <View style={styles.Reports}>

      <FlatList
        data={reportlist}
        renderItem={(item) => {
          const itemIndex = item.index;
          if (item.item !== null) {
            return (
              <TouchableOpacity onPress={() => getSpecificReport(itemIndex)}>
                <View style={styles.Report1}>
                  <TouchableOpacity>
                    <View>
                      <Image
                        style={styles.stretch}
                        source={require('../assets/ReportIcon.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.Report1Text}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Tumor Report</Text>

                    <Text style={{ marginLeft: 8, fontSize: 15, color: 'black' }}>Report ID {item.item.Report_ID} </Text>
                  </View>

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
              </TouchableOpacity>
            );
          }
        }}
      />




    </View>
  );
}


export default ViewTumorReports;

const styles = StyleSheet.create({
  Reports: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1
  },
  Report1: {
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
  Report1Text: {
    marginTop: 5,
    marginLeft: 10

  },
  Removebtn: {
    backgroundColor: 'black',
    borderRadius: 14,
    width: 100,
    height: 38,
    marginLeft: 15,
    marginTop: 61,
    borderRadius: 14
  },
});
