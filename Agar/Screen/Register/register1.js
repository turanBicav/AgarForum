import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'react-native-material-color';
import { AuthContext } from '../../Navigation/AuthProvider';


import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';



export default  register1 = ({navigation}) =>{

  const {register,user} = useContext(AuthContext);
  
  
  function handleSubmit(values){

    register(values.email,values.password,values.name).then(()=>{

  const userId = firebase.auth().currentUser.uid;
        if (userId) {
          
          const database = firebase.database().ref('kullaniciBilgiler/'+userId+'/bilgiler');
          database.set({
            name: values.name,
            surname: values.surname,
            email: values.email,

          }).then(() => console.log('okey'));
        }else{
          alert('hata')
        }

    })
   
  
  navigation.navigate('Asama 2');
    
  };

  const R1validationSchema =  Yup.object().shape({
    name: Yup
    .string()
    .required('İsim alanını boş bırakmayın'),

    surname: Yup
    .string()
    .required('Soyisim alanını boş bırakmayın'),

    email: Yup
    .string()
    .email('Yanlış biçimli mail adresi')
    .required('Email alanını boş bırakmayın'),

    password: Yup
    .string()
    .min(6)
    .required('Şifre alanını boş bırakmayın'),

  })

 



    return (

      <SafeAreaView style={styles.container}>

        <ScrollView>
          <View style={styles.top}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={
                require('../../image/logo.png')
              }
            />
          </View>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={R1validationSchema}
          >
            {
              ({
                values,
                handleSubmit,
                isValid,
                isSubmitting,
                errors,
                handleChange,
                handleBlur
              }) => (

                <View style={styles.mid}>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>İsim</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.name}
                          onBlur={handleBlur('name')}
                          onChangeText={handleChange('name')}
                          style={styles.input}
                          placeholder={"İsim girin"}
                        
                        />
                      </LinearGradient>
                      {(errors.name) && <Text style={styles.error}>{errors.name}</Text>}
                    </View>
                    
                  </View>

                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>Soyisim</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.surname}
                          onChangeText={handleChange('surname')}
                          onBlur={handleBlur('surname')}
                          placeholder={"Soyisim girin"}
                          style={styles.input}

                        />
                      </LinearGradient>
                      {(errors.surname) && <Text style={styles.error}>{errors.surname}</Text>}
                    </View>
                   
                  </View>


                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>E-mail</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          placeholder={"E-mail girin"}
                          style={styles.input}
                          keyboardType='email-address'
                        />
                      </LinearGradient>
                      {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                    </View>
                    
                  </View>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>Şifre</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          style={styles.input}
                          placeholder={"Şifre girin"}
                          keyboardType='visible-password'
                          secureTextEntry
                        />
                      </LinearGradient>
                      {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                    </View>
                  </View>

                  <TouchableOpacity
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.textButton}>GEÇ</Text>

                  </TouchableOpacity>

                </View>

              )
            }
          </Formik>
          <View style={styles.bot}>

          </View>

        </ScrollView>


      </SafeAreaView>

    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.BLACK

  },


  top: {

    alignItems: 'center',
    marginTop: 80,
  },


  mid: {
    marginTop: 30,
    flexDirection: 'column',
    marginHorizontal: 25,



  },

  box: {
    marginBottom: 10
  },

  textBox: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 1

  },

  inputView: {
    flex: 1,

  },

  input: {

    borderRadius: 15,
    width: '99%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 2

  },
  grediant: {
    width: '99%',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textMid: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15


  },
  bot: {
    flex: 1

  },

  button: {

    backgroundColor: Color.PURPLE[800],
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 10

  },
  textButton: {
    paddingVertical: 12,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15

  },
  error:{
    color:'#f00',
    textAlign:'center'
  }
})
