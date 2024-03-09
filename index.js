/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import {name as appName} from './app.json';
import {Notifications} from 'react-native-notifications';
import {MaskedViewBase} from 'react-native';

AppRegistry.registerComponent(appName, () => App);

Notifications.registerRemoteNotifications();

// Register a callback for handling foreground notifications
Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
    console.log(
      `Notification received in foreground: ${JSON.stringify(notification)}`,
    );

    completion({alert: false, sound: false, badge: false});
  },
);
