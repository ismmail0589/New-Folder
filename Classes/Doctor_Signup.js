import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Button
} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';


export const Doctor_Signup = (props) => {

    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dob, setDOB] = useState(null);
    const [gender, setGender] = useState(null);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [pmdc, setPmdc] = useState(null);
    const [phone, setPhone] = useState(null);




    const [doctorlist, setDoctorList] = useState(null);
    const [dateshow, setDateshow] = useState(0);

    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (selectedDate) => {

        if (selectedDate) {
            const selectedDateWithoutTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDate(selectedDateWithoutTime);

            setDOB(date.toString());

        }
    };

    const handleOKPress = () => {
        setShowDatePicker(false);
        setDateshow(1);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);

    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const data = await database()
                .ref('Doctors')
                .on('value', (tempdata) => {
                    setDoctorList(tempdata.val());
                });
        } catch (err) {
            console.log(err);
        }
    };



    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert('Password Length must be greater than 6');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Invalid Email');
        } else if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
        } else if (gender == null) {
            Alert.alert('Please enter gender');
        } else if (dob == null) {
            Alert.alert('Please enter Date of birth');
        } else {

            try {
                const isUserCreated = await auth().createUserWithEmailAndPassword(
                    email,
                    password
                );

                await auth().currentUser.sendEmailVerification();

                await auth().signOut();

                props.navigation.navigate('login');


                Alert.alert(
                    'Please verify your email through verification link sent to your email'
                );

                addDoctors();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const addDoctors = async () => {
        console.log('adding doctors')
        try {
            const index = doctorlist.length;

            await database().ref(`Doctors/${index}`).set({

                DOB: dob,
                Full_Name: fullName,
                Email: email,
                Gender: gender,
                Phone_Number: phone,
                PMDC: pmdc,
                image: 'null',
                Title:'title',
                Experience:'experience',
                GraduationInstitute:"graduatioinstiute",
                YearofGraduation:'yearofgraduation',
                Dutytime:'dutytime',
                About:'about'


            });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.containerSignup}>
            <Text style={styles.mainHeading}>DOCTOR</Text>

            <View style={styles.box1}>
                <Text>{Object.values(errors)[0]}</Text>
                <TextInput
                    style={styles.input2}
                    placeholder="Full Name"
                    onChangeText={(value) => setFullName(value)}
                    value={fullName}
                />
            </View>
            <View style={styles.box1}>
                <TextInput
                    style={styles.input2}
                    placeholder="E-mail"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
            </View>

            <View >
                <TouchableOpacity onPress={showDatePickerModal} style={styles.boxPicker}>
                    {dateshow == 0 ? <Text> Date of Birth</Text> : <Text>{date.toDateString()}</Text>}
                </TouchableOpacity>

                {showDatePicker && (
                    <View>
                        <DatePicker
                            date={date}
                            onDateChange={onDateChange}
                            mode="date" // You can use "date", "time", or "datetime"

                        />
                        <Button title="OK" onPress={handleOKPress} />
                    </View>
                )}
            </View>

            <DropDownPicker style={[styles.boxPicker, { marginBottom: open ? 60 : 0 }]}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(selectedValue) => {
                    setGender(selectedValue);
                    setValue(selectedValue);
                }}
                setItems={setItems}
                textStyle={{ textAlign: 'center' }}
                dropDownContainerStyle={{ width: 304, marginLeft: 45 }}

            />

            <View style={styles.boxPassword}>
                <TextInput
                    secureTextEntry={true}
                    style={styles.inputPassword}
                    placeholder=" Password"
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
            </View>
            <View style={styles.boxCPassword}>
                <TextInput
                    secureTextEntry={true}
                    style={styles.inputCPassword}
                    placeholder="Confirm Password"
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                />
            </View>

            <View style={styles.boxCPassword}>
                <TextInput

                    style={styles.inputCPassword}
                    placeholder="Phone"
                    onChangeText={(value) => setPhone(value)}
                    value={phone}
                />
            </View>

            <View style={styles.boxCPassword}>
                <TextInput

                    style={styles.inputCPassword}
                    placeholder="PMDC Reg#"
                    onChangeText={(value) => setPmdc(value)}
                    value={pmdc}
                />
            </View>



            <View style={{ position: "absolute", bottom: 115 }}>
                <View style={styles.Continue}>
                    {password == null ||
                        confirmPassword == null ||
                        fullName == null ||
                        password.length < 6 ||
                        password != confirmPassword ? (
                        <TouchableOpacity
                            onPress={() => Alert.alert('Please Enter data in all fields')}
                            style={styles.btn}
                        >
                            <Text style={[styles.text, { color: '#fff' }]}>SIGN UP</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleSignup()} style={styles.btn}>
                            <Text style={{ color: 'white', fontSize: 16 }}>SIGN UP</Text>
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: -80,
        color: '#2B2B2B',
        fontSize: 25,
    },
    boxPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxCPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputPassword: {
        height: 54,
        width: 304,
        borderRadius: 14,
        marginTop: 15,
        backgroundColor: '#ECE0E0',
        textAlign: 'center',
    },
    inputCPassword: {
        height: 54,
        width: 304,
        borderRadius: 14,
        marginTop: 15,
        backgroundColor: '#ECE0E0',
        textAlign: 'center',
    },
    input2: {
        height: 54,
        width: 304,
        borderRadius: 14,
        marginTop: 15,
        backgroundColor: '#ECE0E0',
        textAlign: 'center',
    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxPicker: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        width: 304,
        borderRadius: 14,
        marginTop: 15,
        backgroundColor: '#ECE0E0',
        borderWidth: 0,
        alignSelf: 'center',

    },
    btn: {
        backgroundColor: '#d34b4b',
        width: 304,
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    Continue: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    containerSignup: {
        paddingTop: 100,
        paddingBottom: 200,
        flexGrow: 1,
        alignItems: 'center',
    },
    inputContainer: {
        paddingTop: 16,
        flex: 1,

    },
});
