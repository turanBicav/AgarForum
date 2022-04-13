import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken(){
    let fcmToken = AsyncStorage.getItem("fcmToken");
    console.log(fcmToken,'eski token');

    if (fcmToken) {

     try {
        const fcmToken = await messaging().getToken();

        if(fcmToken){
            console.log(fcmToken,"yeni token");

            await AsyncStorage.setItem("fcmToken",fcmToken);
        }
     } catch (error) {
         console.log(error,"fcm")
     }

    }
}

export const NotificationListener = ()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      messaging().onMessage(async remoteMessage => {
          console.log('notification state....',remoteMessage)
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      
      const unsubscribe = messaging().onMessage(
        async (remoteMessage) => {
          alert('A new FCM message arrived!');
          console.log(
            'A new FCM message arrived!',
            remoteMessage
          );
        }
      );

      return unsubscribe;

      
}