import React ,{useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

export const Profile = (props)=> {


  const handleLogout = async()=>{
    try {
     
      await Auth().signOut();
      
      props.navigation.dispatch(
        StackActions.replace('login')
      );

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.containerProfile}>
      <View style={styles.ProfileImage}>
        <Image source={require('../assets/ProfileImage.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <Image source={require('../assets/EditAcc.png')} />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 5,
              color:'black'
            }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View>
          <Image
            style={{marginLeft: 170}}
            source={require('../assets/ForwardIcon.png')}
          />
        </View>
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../assets/Line.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <Image source={require('../assets/Notify.png')} />
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, color:'black'}}>
            Notification
          </Text>
        </TouchableOpacity>
        <View>
          <Image
            style={{marginLeft: 180}}
            source={require('../assets/ForwardIcon.png')}
          />
        </View>
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../assets/Line.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <Image source={require('../assets/eye.png')} />
        </View>

        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, color:'black'}}>
          Dark Mode
        </Text>

        <View>
          <TouchableOpacity>
            <Image
              style={{marginLeft: 170}}
              source={require('../assets/dm2.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../assets/Line.png')} />
      </View>
      <View style={styles.myView}>
        <View>
          <Image source={require('../assets/logout.png')} />
        </View>
 <TouchableOpacity onPress={()=>handleLogout()}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, color:'black'}}>
          Logout
        </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Profile}
//           options={{
//             title: 'Profile',
//             headerStyle: {
//               backgroundColor: '#d34b4b',
//             },
//             headerTitleStyle: {
//               color: 'white',
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  containerProfile:{
    flex:1
  },

  ProfileImage: {
    marginLeft: 120,
    marginTop: 40,
  },

  myView: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
  },
});
