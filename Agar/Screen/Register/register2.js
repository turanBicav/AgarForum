import React, {  useState,useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import Color from 'react-native-material-color';
import LinearGradient from 'react-native-linear-gradient';
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

 // constructor(props) {
  //   super(props);
  //   this.state = {
  //     language: '',
  //     value: '',
  //     dataSource: [],
  //   };

  // }



export default  register2 = ({navigation})=> {

  const userId = firebase.auth().currentUser.uid;

  const [value, setValue] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('null');

 function handleSubmit(values){

    
    if (userId) {
      const database = firebase.database().ref('kullaniciBilgiler/'+userId+'/bilgiler');
      database.update({
        school: values.school,
        job: values.job,
        age: values.age,
        liveCity: values.liveCity,
        schoolLevel: schoolLevel,
        cinsiyet: value,

      }).then(() => console.log('okey'));
    }else{
      alert('heta')
    }
    navigation.navigate('Asama 3');
  }

  const R2validationSchema = Yup.object().shape({
    school: Yup
    .string()
    .required('Okul alanını boş bırakmayın'),

    job: Yup
    .string()
    .required('İş alanını boş bırakmayın'),

    age: Yup
    .string()
    .required('Yaş alanını boş bırakmayın'),

    liveCity: Yup
    .string()
    .required('Şehir alanını boş bırakmayın'),

    schoolLevel:Yup
    .string()
    .required('Okul alanını boş bırakmayın'),

    
   
  });


 

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView >
          <View style={styles.top}>

          </View>
          <Formik
            initialValues={{
              school: '',
              job: '',
              age: '',
              liveCity: '',
              schoolLevel: '',
              cinsiyet: 'false'

            }}
            onSubmit={handleSubmit}
            validationSchema={R2validationSchema}
              
          >
            {
              ({
                values,
                handleSubmit,
                isValid,
                isSubmitting,
                errors,
                handleChange,
                handleBlur,
                setFieldValue
              }) => (

                <View style={styles.mid}>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>school</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.school}
                          onChangeText={handleChange('school')}
                          onBlur={handleBlur('school')}
                          style={styles.input}
                          placeholder={'Yaz'}
                        />
                      </LinearGradient>
                      {(errors.school) && <Text style={styles.error}>{errors.school}</Text>}
                    </View>
                    
                  </View>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>job</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.job}
                          onChangeText={handleChange('job')}
                          onBlur={handleBlur('job')}
                          style={styles.input}
                          placeholder={'Yaz'}
                        />
                        </LinearGradient>
                        {(errors.job) && <Text style={styles.error}>{errors.job}</Text>}
                    </View>
                  </View>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>age</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.age}
                          onChangeText={handleChange('age')}
                          onBlur={handleBlur('age')}
                          style={styles.input}
                          placeholder={'Yaz'}
                        />
                        </LinearGradient>
                        {(errors.age) && <Text style={styles.error}>{errors.age}</Text>}
                    </View>
                  </View>
                  <View style={styles.box}>
                    <View style={styles.textBox}>
                      <Text style={styles.textMid}>liveCity</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          values={values.liveCity}
                          onChangeText={handleChange('liveCity')}
                          style={styles.input}
                          placeholder={'Yaz'}
                        />
                        </LinearGradient>
                        {(errors.liveCity) && <Text style={styles.error}>{errors.liveCity}</Text>}
                    </View>
                  </View>
                  <View style={styles.box}>
                    <Text style={{ paddingLeft: 10, paddingTop: 10, color: 'white' }}>Okul seviye</Text>
                  </View>
                  <View style={{ borderColor: Color.PURPLE[200], borderWidth: 2, borderRadius: 22 }}>
                    <Picker
                      dropdownIconColor={'white'}
                      selectedValue={schoolLevel}
                      style={styles.pickerStyle}
                      onValueChange={
                        (itemValue,itemIndex) =>{
                         setFieldValue('schoolLevel',itemValue) 
                        setSchoolLevel(itemValue)}}
                    >
                      <Picker.Item label="Seçiniz" value='null' />
                      <Picker.Item label="İlkokul" value="ilkokul" />
                      <Picker.Item label="Ortaokul" value="ortaokul" />
                      <Picker.Item label="Lise" value="lise" />
                      <Picker.Item label="Üniversite" value="üniversite" />
                      <Picker.Item label="Yüksek Lisans" value="yüksek_lisans" />
                    </Picker> 
                  </View>
                  {(errors.schoolLevel) && <Text style={styles.error}>{errors.schoolLevel}</Text>}
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <RadioButton.Group
                      onValueChange={(value) => setValue( value )}
                      value={value}
                      onChangeText={handleChange('cinsiyet')}
                      vertical="true"
                    >
                      <View >
                        <RadioButton.Item
                          uncheckedColor={"white"}
                          color={'red'}
                          position={'leading'}
                          labelStyle={{ color: 'white' }}
                          label="Erkek" value="erkek" />
                      </View>
                      <View >
                        <RadioButton.Item
                          uncheckedColor={"white"}
                          color={'red'}
                          label="Kadın"
                          labelStyle={{ color: 'white' }}
                          position={'leading'}
                          value="kadin" />
                      </View>

                    </RadioButton.Group>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}

                  >
                    <Text style={styles.buttonText}>GEÇ</Text>

                  </TouchableOpacity>

                </View>

              )
            }
          </Formik>

          <View style={styles.bot}>

          </View>
        </SafeAreaView>
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.BLACK,



  },
  top: {
    marginTop: 80,
    alignItems: 'center',

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

  pickerStyle: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',


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
  buttonText: {
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
