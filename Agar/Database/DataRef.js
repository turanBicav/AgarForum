import auth,{ firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

 


    export const userId = () => {
        return(
         user = firebase.auth().currentUser.uid,
         db = firebase.database(),
         kBilgiRef = db.ref('kullaniciBilgiler/'+`${user}`)

        )
    }


   



