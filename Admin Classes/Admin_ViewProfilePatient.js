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


const Admin_ViewProfilePatient = () => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dob, setDOB] = useState(null);
    const [disease, setDisease] = useState(null);
    const [phone, setPhone] = useState(null);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        getData();

    }, [])

    const getData = async () => {
        try {
          
            const Full_Name = await AsyncStorage.getItem('Full_Name');
            const Email = await AsyncStorage.getItem('Email');
            const Disease = await AsyncStorage.getItem('Disease');
            const DOB = await AsyncStorage.getItem('DOB');
            const Gender = await AsyncStorage.getItem('Gender');
            const Phone_Number = await AsyncStorage.getItem('Phone_Number');
            const image = await AsyncStorage.getItem('image');
        
        
            setName(Full_Name); // Format the time
            setEmail(Email);
            setPhone(Phone_Number);
            setDisease(Disease)
            setDOB(DOB);
            setImageData(image);   
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <View style={styles.containerEditProfile}>

            <ScrollView>

                <KeyboardAvoidingView behavior="padding" style={styles.container}></KeyboardAvoidingView>

                <View style={styles.inputContainer}>

                    <Text style={{ marginRight: 220, fontSize: 16, color: 'black' }}>Full Name</Text>
                    <View style={styles.box2}>
                        <TextInput style={styles.input2} placeholder={name} placeholderTextColor="black"  />
                    </View>

                    <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>Email</Text>
                    <View style={styles.box2}>
                        <TextInput style={styles.input2} placeholder={email} placeholderTextColor="black" />
                    </View>
                    <Text style={{ marginRight: 260, fontSize: 16, color: 'black', marginTop: 8 }}>DOB</Text>
                    <View style={styles.box2}>
                        <TextInput style={styles.input2} placeholder={dob} placeholderTextColor="black"  />
                    </View>
                    <Text style={{ marginRight: 235, fontSize: 16, color: 'black', marginTop: 8 }}>Disease</Text>
                    <View style={styles.box2}>
                        <TextInput style={styles.input2} placeholder={disease} placeholderTextColor="black"  />
                    </View>
                    <Text style={{ marginRight: 190, fontSize: 16, color: 'black', marginTop: 8 }}>Phone Number</Text>
                    <View style={styles.box2}>
                        <TextInput style={styles.input2} placeholder={phone} placeholderTextColor="black" />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Admin_ViewProfilePatient;

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
        borderWidth: 0.1,
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
