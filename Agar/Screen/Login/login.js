import React, { useContext } from 'react';
import * as Yup from "yup";
import { Formik } from "formik";
import auth from '@react-native-firebase/auth';
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





export default login = ({navigation})=>{


  const {login} = useContext(AuthContext)

  const signInvalidationSchema =Yup.object().shape({

    email:Yup
    .string()
    .required('boş geçilemez')
    .email('geçerli bir email adresi yaziniz'),
    
    password:Yup
    .string()
    .required('boş geçilemez').min(6,({min})=>'sifre en az '+ min +'karakter olmalıdır!')
    })
  /*function _handleSubmit (values){

    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        alert('basarılı giriş')
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('wrong pass')
          return;
        }
        if (error.code === 'auth/user-not-found') {
          alert('User Not Found');
          return;
        }
        console.error(error);
      });
    this.props.navigation.navigate('profile');
  }*/

    return (

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.top}>
            <Image
              style={{
                width: 150,
                height: 200,
                resizeMode: 'contain'
              }}
              source={
                require('../../image/logo.png')
              }
            />
            <Text style={styles.textLogo}>AGER FORUM</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(values)=>login(values.email,values.password)}
            validationSchema={signInvalidationSchema}
          >
            {
              ({
                values,
                handleSubmit,
                isValid,
                isSubmitting,
                errors,
                handleBlur,
                handleChange
              }) => (

                <View style={styles.mid}>
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
                          placeholder={"Email"}
                          placeholderTextColor={"#302000"}
                          style={styles.input}
                          keyboardType="email-address"

                        />
                        
                      </LinearGradient>
                      {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                    </View>

                    {/*(errors.email) && <Text styles={styles.error}>{errors.email}</Text>*/}
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
                          placeholder={"Password"}
                          placeholderTextColor={"#302000"}
                          style={styles.input}
                          secureTextEntry={true}

                        />
                       
                      </LinearGradient>
                      {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={!isValid }
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.button_text}>Sign in My Account</Text>
                  </TouchableOpacity>
                  <View style={styles.kayitText}>
                    <TouchableOpacity
                      onPress={() =>navigation.navigate('Register')}

                    >
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Kayit Ol</Text>
                    </TouchableOpacity>
                  </View>
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
    marginTop: 40,

  },
  textLogo: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',

  },
  mid: {
    marginTop: 30,
    flexDirection: 'column',
    marginHorizontal: 25,
  },
  box: {
    marginBottom: 10
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
    margin: 2,
    paddingLeft: 10
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
  textBox: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 1

  },
  bot: {
    flex: 1,
    paddingVertical: 50,

  },
  button: {
    backgroundColor: '#7165E3',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center'
  },

  kayitText: {

    marginTop: 20,
    alignSelf: 'center'

  },
  error:{
    color:'#f00',
    textAlign:'center'
  }


})
