import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ChatBox = ({imageSource, name, message}) => {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Image style={styles.img} source={imageSource} />
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.msg}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const Chat = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ChatBox
        imageSource={require('../assets/logo.png')}
        name="Jamal"
        message="Your Appointment has been cancelled"
      />
      <View style={styles.hr} />
      <ChatBox
        imageSource={require('../assets/logo.png')}
        name="Hasham"
        message="Your Reports have been recieved."
      />
      <View style={styles.hr} />
      <ChatBox
        imageSource={require('../assets/logo.png')}
        name="Imran Aslam"
        message="Your Medications have been Shipped."
      />
      <View style={styles.hr} />
      <ChatBox
        imageSource={require('../assets/logo.png')}
        name="Ali Kayani"
        message="Your Appointment has been cancelled"
      />
      <View style={styles.hr} />
    </View>
  );
};

// const App = () => {
//   // Rest of your code remains the same
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Chat"
//           component={Chat}
//           options={{
//             title: 'Chat',
//             headerStyle: {
//               backgroundColor: '#d34b4b',
//             },

//             headerTintColor: 'white',
//             headerLeft: () => (
//               <Image
//                 source={require('../assets/back.png')}
//                 style={{marginRight: 10, height: 25}}
//               />
//             ),
//             headerTitleStyle: {
//               fontWeight: 'bold',
//               fontFamily: 'inter',
//               fontSize: 24,
//             },
//             headerRight: () => <Image source={require('../assets/bell.png')} />,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// ...

// Styles remain the same

export default Chat;
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 45,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  msg: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 6,
  },

  box: {
    marginTop: 10,
    marginBottom: 10,
  },
  hr: {
    borderColor: 'black',
    borderBottomWidth: 0.5,
  },
  name: {
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 5,
  },
});
