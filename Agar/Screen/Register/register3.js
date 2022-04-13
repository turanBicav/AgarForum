import React, { useState,useRef } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'react-native-material-color';

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



const items = [
{
  id:0,
  name:'Turan'
}, 
{
  id: 1,
  name: 'Ondo',
 
}, {
  id: 2,
  name: 'Ogun',
  
}, {
  id: 3,
 
  name: 'Calabar'
}, {
  id: 4,
  
  name: 'Lagos'
}, {
  id: 5,
 
  name: 'Maiduguri'
}, {
  id: 6,
 
  name: 'Anambra'
}, {
  id: 7,
 
  name: 'Benue'
}, {
  id: 8,
  
  name: 'Kaduna'
}, {
  id: 9,
  
  name: 'Abuja'
}
];



export default register3 = ({navigation},props) => {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     language: '0',
  //     selectedItems: [],

  //   };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsVal, setSelectedItemsVal] = useState([]);
  //const multiSelect = useRef([]);
  const userId = firebase.auth().currentUser.uid;

  function handleSubmit(values){

   
    if (userId) {
      const database = firebase.database().ref('kullaniciBilgiler/'+userId+'/bilgiler');
      database.update({
        school1: values.school1,
        job1: values.job1,
        age1: values.age1,
        liveCity1: values.liveCity1,
        selectedItems:selectedItemsVal,

      }).then(() => console.log('okey'));

    }
    navigation.navigate('Login');
  }

  const onSelectedItemsChange = (selectedItems) => {

    setSelectedItems(selectedItems);

    console.log(selectedItems)

    var sel = [];
    selectedItems.map((a)=>{
      sel.push(items[a])
      setSelectedItemsVal(sel)
      console.log(sel)
    })
    
  };

  const R3validationSchema =Yup.object().shape({
    school1: Yup
    .string()
    .required('school1 alanını boş bırakmayın'),
    
    job1: Yup
    .string()
    .required('job1 alanını boş bırakmayın'),

    age1: Yup
    .string()
    .required('age1 alanını boş bırakmayın'),

    liveCity1: Yup
    .string()
    .required('liveCity1 alanını boş bırakmayın'),
    //selectedItems:Yup.array().min(1).required(<Text style={{color:'white'}}>basarısız soyisim</Text>),

  })


  
  



    return (
      <ScrollView style={styles.container}>
        <SafeAreaView >
          <View style={styles.top}>

            <Text style={styles.textLogo}>AGER FORUM</Text>
          </View>
          <Formik
            initialValues={{
              school1: '',
              job1: '',
              age1: '',
              liveCity1: '',
              selectedItems: [],

            }}
            onSubmit={handleSubmit}
            validationSchema={R3validationSchema}
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
                      <Text style={styles.textMid}>school</Text>
                    </View>
                    <View style={styles.inputView}>
                      <LinearGradient
                        colors={['#840ec1', '#a643d9', '#d743d9', '#be1dc0', '#a00ba2', '#8a04a6']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                      >
                        <TextInput
                          style={styles.input}
                          values={values.school1}
                          onChangeText={handleChange('school1')}
                          onBlur={handleBlur('school1')}
                          placeholder={'Yaz'}
                        />
                      </LinearGradient>
                    </View>
                    {(errors.school1) && <Text style={styles.error}>{errors.school1}</Text>}
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
                          style={styles.input}
                          values={values.job1}
                          onChangeText={handleChange('job1')}
                          onBlur={handleBlur('job1')}
                          placeholder={'Yaz'}
                        /></LinearGradient>
                    </View>
                    {(errors.job1) && <Text style={styles.error}>{errors.job1}</Text>}
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
                          style={styles.input}
                          values={values.age1}
                          onChangeText={handleChange('age1')}
                          onBlur={handleBlur('age1')}
                          placeholder={'Yaz'}
                        />
                      </LinearGradient>
                    </View>
                    {(errors.age1) && <Text style={styles.error}>{errors.age1}</Text>}
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
                          style={styles.input}
                          values={values.liveCity1}
                          onChangeText={handleChange('liveCity1')}
                          onBlur={handleBlur('liveCity1')}
                          placeholder={'Yaz'}
                        /></LinearGradient>
                    </View>
                    {(errors.liveCity1) && <Text style={styles.error}>{errors.liveCity1}</Text>}
                  </View>
                  <View style={styles.multiSelect}>
                    <MultiSelect

                      hideTags
                      items={items}
                      uniqueKey="id"
                      //ref={(component) => { multiSelect = component}}
                      onSelectedItemsChange={onSelectedItemsChange}
                      selectedItems={selectedItems}
                      selectText="Pick Items"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) => console.log(text)}
                      altFontFamily="ProximaNova-Light"
                      tagRemoveIconColor="#CCC"
                      tagBorderColor={Color.PURPLE[800]}
                      tagTextColor="#CCC"
                      selectedItemTextColor={Color.PURPLE[200]}
                      selectedItemIconColor={Color.PURPLE[400]}
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: '#CCC' }}
                      submitButtonColor={Color.PURPLE[400]}
                      submitButtonText="Submit"
                      scrollEnabled="false"
                      //value={selectedItems}
                      styleDropdownMenuSubsection={{
                        borderColor: 'purple',
                        borderWidth: 2,
                        marginBottom: -10,
                        marginHorizontal: 3,
                        paddingLeft: 10,
                        borderRadius: 15,

                      }}
                    />

                    <View>
                    {/* multiSelect ? props.multiSelect.getSelectedItemsExt()
                          :
                    null*/}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textButton}>TAMAMLA</Text>

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

  inputView: {
    flex: 1,

  },

  textBox: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 1

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

  multiSelect: {
    marginTop: 20,
    flex: 1


  },
  bot: {
    flex: 1,


  },
  button: {

    backgroundColor: Color.PURPLE[800],
    borderRadius: 20,
    marginTop: 30,
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
