import { View, Text } from 'react-native';
import React , {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
    channelId:'Agar51',
    channelName:'Agar',
    playSound:true,

}
)

const NotificationController = (props)=>{

    useEffect(()=>{

        const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
            PushNotification.localNotification({
                message:remoteMessage.notification.body,
                title:remoteMessage.notification.title,
                bigPictureUrl:remoteMessage.notification.android.imageUrl,
                channelId:true,
                vibrate:true
            })
        })
      return unsubscribe;
    },[]);

    return null;

    
}

export default NotificationController;