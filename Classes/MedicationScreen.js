import React, { useState, useEffect } from 'react';
import { View,StyleSheet, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification, { Importance } from 'react-native-push-notification';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MedicineScreen = () => {
  const [medicineName, setMedicineName] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    // Load medications on component mount
    loadMedications();
    // Create notification channel
    PushNotification.createChannel(
      {
        channelId: 'medicine_reminder_channel',
        channelName: 'Medicine Reminders',
        channelDescription: 'Receive notifications for your medication schedule',
        playSound: false,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const createNotification = () => {
    // Log the selected date for debugging
    console.log(selectedDate, 'Alarm date');

    // Use new Date() to ensure the date object is valid
    const notificationDate = selectedDate || new Date();

    // Schedule local notification
    PushNotification.localNotificationSchedule({
      channelId: 'medicine_reminder_channel',
      title: 'Medicine Reminder',
      message: `It's time to take your ${medicineName} medication!`,
      date: notificationDate,
    });

    // Save medication information to Firebase Realtime Database
    saveMedicationToFirebase(medicineName, notificationDate);

    // Clear the medicine name input
    setMedicineName('');
    // Reload medications to update FlatList
    loadMedications();
  };

  const saveMedicationToFirebase = (medicationName, medicationTime) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      // Save medication information to the user's node in the database
      database()
        .ref(`users/${userId}/medications`)
        .push({
          medicineName: medicationName,
          medicineTime: medicationTime.toISOString(), // Save time in ISO format
        })
        .then(() => console.log('Medication saved to Firebase'))
        .catch((error) => console.error('Error saving medication to Firebase:', error));
    }
  };

  const loadMedications = () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      // Load medications from Firebase
      database()
        .ref(`users/${userId}/medications`)
        .once('value')
        .then((snapshot) => {
          const medicationsData = snapshot.val();
          if (medicationsData) {
            const medicationsArray = Object.keys(medicationsData).map((key) => ({
              id: key,
              ...medicationsData[key],
            }));
            setMedications(medicationsArray);
          } else {
            setMedications([]);
          }
        })
        .catch((error) => console.error('Error loading medications from Firebase:', error));
    }
  };

  // Render each medication item in the FlatList
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row',alignItems:'center', justifyContent: 'space-between',marginVertical:5,}}>
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', color:'black'}}>{item.medicineName}</Text>
        <Text style={{ fontSize: 15, color:'black'}}>{new Date(item.medicineTime).toLocaleString()}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteMedication(item.id)}>
        {/* <Text style={{ color: 'red', marginLeft: 10 }}>Delete</Text> */}
        <Icon name = 'eraser' size = {25} color = 'black'/>
      </TouchableOpacity>
    </View>
  );

  const deleteMedication = (medicationId) => {
    // Delete medication from Firebase
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      database()
        .ref(`users/${userId}/medications/${medicationId}`)
        .remove()
        .then(() => {
          console.log('Medication deleted from Firebase');
          // Reload medications to update FlatList
          loadMedications();
        })
        .catch((error) => console.error('Error deleting medication from Firebase:', error));
    }
  };

  return (
    <View style  = {styles.mainView}>
      
      <View style={styles.box2}>
      <TextInput style={styles.input2}
        placeholder="Enter medicine name"
        value={medicineName}
        onChangeText={setMedicineName}
        placeholderTextColor={'black'}
      />
</View>
      {/* Date Picker */}
      
      <TouchableOpacity  style = {styles.selectDate} onPress={showDatePicker}>
        <Text style = {{color:'white'}}>
        Select Date
        </Text>
      </TouchableOpacity>
     

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

<TouchableOpacity  style = {styles.createNotification} onPress={createNotification}>
        <Text style = {{color:'white'}}>
        Create Notification
        </Text>
      </TouchableOpacity>

      {/* Medications FlatList */}
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={(item) => item.medicineTime}
      />
    </View>
  );
};

export default MedicineScreen;

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  input2: {
    color: 'black',
    textAlign: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 54,
    width: 360,
    borderRadius: 14,
    marginTop: 35,
    backgroundColor: '#ECE0E0',
    textAlign: 'center',
    marginLeft:8
  },
  selectDate: {
    backgroundColor: '#d34b4b',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  createNotification: {
    backgroundColor: '#d34b4b',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  
});
