import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Alert, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';

import first from './Classes/first';
import splash from './Classes/splash';
import Book_Appointment from './Classes/Book_Appointment';
import Detector from './Classes/Detector';
import EditProfile from './Classes/EditProfile';
import Forgetpass from './Classes/Forgetpass';
import Sclerosis_Report from './Classes/Sclerosis_Report';
import messeging from './Classes/messeging';
import Report from './Classes/Report';
import Tumor_det from './Classes/Tumor_det';
import Tumor_Report from './Classes/Tumor_Report';
import DetailedTumorReport from './Classes/DetailedTumorReport';
import DetailedAlzhiemerReport from './Classes/DetailedAlzhiemerReport';
import DetailedSclerosisReport from './Classes/DetailedSclerosisReport';
import {View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Alzheimer_det from './Classes/Alzheimer_det';
import MultipleSclerosis_det from './Classes/MultipleSclerosis_det';
import {Login} from './Classes/login';
import {Patient_Signup} from './Classes/Patient_Signup';
import Admin_ViewDoctorsList from './Admin Classes/Admin_ViewDoctorsList';
import Admin_ViewPatientsList from './Admin Classes/Admin_ViewPatientsList';
import {Dashboard} from './Classes/Dashboard';
import {Profile} from './Classes/Profile';
import MedicationScreen from './Classes/MedicationScreen';
import {Doctor_Signup} from './Classes/Doctor_Signup';
import {Doctor_Dashboard} from './Classes/Doctor_Dashboard';
import ViewAlzhiemerReports from './Classes/ViewAlzhiemerReports';
import ViewTumorReports from './Classes/ViewTumorReports';
import ViewSclerosisReport from './Classes/ViewSclerosisReport';
import DoctorEditBio from './Classes/DoctorEditBio';
import Admin_ViewProfilePatient from './Admin Classes/Admin_ViewProfilePatient';
import Admin_ViewProfileDoctor from './Admin Classes/Admin_ViewProfileDoctor';
import DoctorAddbio from './Classes/DoctorAddbio';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tabt = createMaterialTopTabNavigator();

function AdminScreens() {
  return (
    <Tabt.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#D34B4B',
          height: 58,
        },
      }}>
      <Tabt.Screen name="Pateints" component={Admin_ViewPatientsList} />
      <Tabt.Screen name="Doctors" component={Admin_ViewDoctorsList} />
    </Tabt.Navigator>
  );
}

function ViewReports() {
  return (
    <Tabt.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#D34B4B',
          height: 58,
        },
      }}>
      <Tabt.Screen name="Alzhiemer Reports" component={ViewAlzhiemerReports} />
      <Tabt.Screen name="Tumor Reports" component={ViewTumorReports} />
      <Tabt.Screen name="Sclerosis Report" component={ViewSclerosisReport} />
    </Tabt.Navigator>
  );
}

function Home(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#D34B4B',
          height: 58,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/home.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MedicationScreen"
        component={MedicationScreen}
        options={{
          title: 'Medication',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            position: 'relative',
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/management.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="messeging"
        component={messeging}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/messege.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Book_Appointment}
        options={{
          title: 'Booking',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTitleStyle: {
            color: 'white',
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/booking.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EditProfile}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={async () => {
                await Auth().signOut();
                console.log('s');
                props.navigation.dispatch(StackActions.replace('login'));
              }}>
              <MaterialCommunityIcons name="logout" size={25} color="white" />

              <Text style={{color: 'white', fontSize: 16, marginRight: 10}}>
                Logout
              </Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/Profile.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DoctorHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#D34B4B',
          height: 58,
        },
      }}>
      <Tab.Screen
        name="DoctorHome"
        component={Doctor_Dashboard}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/home.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="messeging"
        component={messeging}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/messege.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="DoctorProfile"
        component={DoctorEditBio}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#d34b4b',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={async () => {
                await Auth().signOut();
                props.navigation.dispatch(StackActions.replace('login'));
              }}>
              <MaterialCommunityIcons name="logout" size={25} color="white" />

              <Text style={{color: 'white', fontSize: 16, marginRight: 10}}>
                Logout
              </Text>
            </TouchableOpacity>
          ),

          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./assets/Profile.png')}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 29,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="first"
          component={first}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="splash"
          component={splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Patient_Signup}
          options={{
            title: 'Signup',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Doctor_Signup"
          component={Doctor_Signup}
          options={{
            title: 'Signup',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Forgetpass"
          component={Forgetpass}
          options={{
            title: 'Forget Password',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorHome}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Admin"
          component={AdminScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewReports"
          component={ViewReports}
          options={{
            title: 'View Reports',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Detector"
          component={Detector}
          options={{
            title: 'Detector',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Tumor_det"
          component={Tumor_det}
          options={{
            title: 'Detect Tumor',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Alzheimer_det"
          component={Alzheimer_det}
          options={{
            title: 'Detect Alzheimer',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="MultipleSclerosis_det"
          component={MultipleSclerosis_det}
          options={{
            title: 'Detect Multiple Sclerosis',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            title: 'Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Sclerosis_Report"
          component={Sclerosis_Report}
          options={{
            title: 'Sclerosis_Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Tumor_Report"
          component={Tumor_Report}
          options={{
            title: 'Tumor_Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DetailedTumorReport"
          component={DetailedTumorReport}
          options={{
            title: 'Tumor_Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DetailedAlzhiemerReport"
          component={DetailedAlzhiemerReport}
          options={{
            title: 'Alzhiemer_Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DetailedSclerosisReport"
          component={DetailedSclerosisReport}
          options={{
            title: 'Multisclerosis_Report',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Admin_ViewProfilePatient"
          component={Admin_ViewProfilePatient}
          options={{
            title: 'Patient Profile',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Admin_ViewProfileDoctor"
          component={Admin_ViewProfileDoctor}
          options={{
            title: 'Doctor Profile',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DoctorAddbio"
          component={DoctorAddbio}
          options={{
            title: 'Doctor Bio',
            headerStyle: {
              backgroundColor: '#d34b4b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
