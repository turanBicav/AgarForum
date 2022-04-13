import { View, Text } from 'react-native'
import React,{useState,useEffect,createContext} from 'react'
import auth from '@react-native-firebase/auth'

export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
    
    value={{
        user,
        setUser,
        login:async(email,password)=>{
            try {
                await auth().signInWithEmailAndPassword(email,password)
                .then(async result =>{
                    if(!result.user.emailVerified){
                        result.user.sendEmailVerification();
                        alert('Lütfen emailinize gelen maili onaylayınız')
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },

        register:async(email,password,name)=>{
            try {
                await auth().createUserWithEmailAndPassword(email,password)
                .then(async result =>{

                    result.user.updateProfile({
                        displayName:name
                    })
                        result.user.sendEmailVerification();
                        alert('Kayıt işlemi bittikten sonra lütfen emailinize gelen maili onaylayınız')
                    
                })
            } catch (error) {
                console.log(error)
            }
        },

        resetPass:async(email)=>{
            try {
                await auth().sendPasswordResetEmail(email);
                alert('sifre sıfırlama kodunuz emaile gönderilmiştir')
            } catch (error) {
                console.log(error)
            }
        },

        signOut:async()=>{
            try {
                await auth().signOut();
                alert('çıkış başarılı')
            } catch (error) {
                console.log(error)
            }
        },

    }}

    >{children}
    </AuthContext.Provider>
  )
}

