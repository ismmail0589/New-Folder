import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function Check({navigation, route}) {
  const [description, setDescription] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [storedName, setStoredName] = useState(null);
  const [reportNumber, setReportNumber] = useState(null);
  const [reportlist, setReportList] = useState(null);

  const ref = useRef();
  const [imageuri, setImageUri] = useState('')

  const prediction = route.params;

  useEffect(() => {
    getData();
    console.log(prediction, 'ASDSA');

    if (prediction.index === 0) {
      setDescription('Mild Demented');
    } else if (prediction.index === 1) {
      setDescription('Moderate Demented');
    } else if (prediction.index === 2) {
      setDescription('Non Demented');
    } else if (prediction.index === 3) {
      setDescription('Very Mild Demented');
    } else {
      console.log('No data');
    }
    const now = new Date();
    setTime(now.toLocaleTimeString()); // Format the time
    setDate(now.toLocaleDateString());

    retrieveNameFromStorage();
    const generatedReportNumber = generateReportNumber();
    setReportNumber(generatedReportNumber);

    
  }, []);

  useEffect(() => {
    console.log('data', reportlist);
    addReports();
  }, [reportlist]);

  const getData = async () => {
    try {
     
      const snapshot = await database()
      .ref('Reports/Alzhiemer')
      .once('value');
    if (snapshot.exists()) {
      setReportList(snapshot.val());
    
    } else {
      console.log('No data available');
    }
       
    } catch (err) {
      console.log(err);
    }
  };



  const addReports = async () => {
    try {
      const index = reportlist.length;

      await database().ref(`Reports/Alzhiemer/${index}`).set({
        Time: time,
        Patient_Email: storedName,
        Date: date,
        Report_ID: reportNumber,
        Description: description,
      });
      console.log('aa')
    } catch (err) {
      console.log(err);
    }
  };

  const generateReportNumber = () => {
    const prefix = 'ALZ'; // You can customize the prefix if needed
    const randomSuffix = Math.floor(Math.random() * 10000); // Adjust the range as needed
    return `${prefix}${randomSuffix}`;
  };

  const retrieveNameFromStorage = async () => {
    try {
      const storedName = await AsyncStorage.getItem('email');
      if (storedName !== null) {
        setStoredName(storedName);
      }
    } catch (error) {
      console.error('Error retrieving name from AsyncStorage:', error);
    }
  };

  
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };

  const captureViewShot = async () => {
    console.log('called')
    try {
      // Capture the view shot
      const uri = await ref.current.capture();

      setImageUri(uri);

      // Create a destination path in the device's filesystem
      const destinationPath = `${RNFS.TemporaryDirectoryPath}/image.jpg`;

      // Move the captured image to the destination path
      await RNFS.moveFile(uri, destinationPath);

      // Save the image to the device's gallery using CameraRoll
      await CameraRoll.saveToCameraRoll(destinationPath);

      // Show a success message
      Alert.alert('Image Saved', 'Image saved successfully in the gallery.');
    } catch (error) {
      // Show an error message if something goes wrong
      console.log(error)
      Alert.alert('Error', 'Failed to save image.');
    }
  };

  return (
    <View style={styles.report}>
       <ViewShot ref={ref} options={{ fileName: "Alzhiemer's Report", format: "jpg", quality: 0.9 }} style = {styles.report}>
      <View style = {styles.report}>
        <Text style={{
          fontSize: 25, color: 'black', fontWeight: 'bold', alignSelf: 'center', position: 'absolute', top:-25
        }}>
          Alzhiemer's Diagnosis Report
        </Text>

        <View style={styles.Reportlabels}>
          <View style={styles.row}>
            <Text style={styles.time}>Time: {time}</Text>
            <Text style={styles.date}>Date: {date}</Text>
          </View>
          <Text style={styles.time}>Report ID: {reportNumber}</Text>
          <Text style={styles.time}>Patient Email: {storedName}</Text>

          <Text style={styles.time}>Description: {description}</Text>
        </View>
      </View>
      </ViewShot>

      <View style={styles.iconContainer}>
        <View style={styles.downloadicon}>
          <TouchableOpacity underlayColor="#E2D4D4" nPress={captureViewShot}>
            <Image
              style={styles.photo2}
              source={require('../assets/icondonload.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.shareIcon}>
          <TouchableOpacity onPress={()=>{
            const options = {
              url: imageuri,
              message:''
            }
            Share.open(options)
          }}>
            <Icon name="share" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  report: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 8,
    height: 560,
    width: 374,
    backgroundColor: '#E2D4D4',
    marginTop: 20,
    position: 'relative',
    borderRadius: 15,
    flex: 1,
  },
  icons: {
    alignSelf: 'center',
    position: 'absolute',
    top: 25,
  },
  photo: {
    height: 30,
    width: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  time: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: 20,
    marginTop: 35,
  },
  date: {
    marginRight: 105,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: 20,
    marginTop: 35,
  },
  downloadicon: {
    backgroundColor: '#D34B4B',
    borderRadius: 190,
    width: 55,
    height: 55,
  },
  photo2: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 30,
    width: 40,
    top: 7,
  },
  shareIcon: {
    backgroundColor: '#D34B4B',
    borderRadius: 190,
    width: 55,
    height: 55,
    padding: 13,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 250,
  },
  Reportlabels: {
    marginTop: -10,
  },
});
