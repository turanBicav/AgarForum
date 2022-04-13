import React, { Component,useState,useEffect,useContext} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import 
{
   View, 
   Text,
   SafeAreaView ,
   StyleSheet,
   ScrollView,
   Image,
   TextInput,
   Dimensions,
   FlatList,
   Button,
   TouchableOpacity, 
   Touchable
  
  } from 'react-native';



    

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const db = firebase.database();


export default otherProfile = ({navigation,route,props}) =>  {

  const {params} = route.params;
  const userId=params.params;
  const [list, setList] = useState([])
  const ref = db.ref('kullaniciBilgiler/'+userId+'/bilgiler');

  function getOtherData(){
    ref.once('value', (snapshot) =>{
      if (snapshot.val()) {
        const data=snapshot.val();
        const otherProfile=Object.values(data) || [];
        setList(otherProfile);
        console.log(data)
      }
     
      })

  }
  

useEffect(() => {
  getOtherData();

  
}, [])





    return (

      <SafeAreaView style={styles.container} >
       
        <View style={styles.profilePhoto}>
        <TouchableOpacity >
        <Image
            source={{
            }}
            style={styles.profPhoto}
          />
           </TouchableOpacity>
          
         
        </View>
        
        <View style={styles.profileDetails}>
        <View style={{flex:1, alignSelf:'center', justifyContent:'center'}}>
       <FlatList 
          data={list} 
          keyExtractor={(item)=>item.key}
          renderItem={({item,index})=>{
             return(
                <View style={{flexDirection:'column',
                width:windowWidth,
                paddingHorizontal:20,
                paddingVertical:10}}>
                   <Text style={styles.ppText}>{item.key}</Text> 
                   <Text  style={styles.input}>
                   {item}
                   </Text>
                   
         </View>
                   
                 )                
                }

             }/>
     </View>   
        
    
   </View>
                   
      </SafeAreaView>
      
    );    
  }


const styles = StyleSheet.create({

container:{
flex:1,
height:windowHeight,
width:windowWidth,


},
profilePhoto:{
flex:2,
backgroundColor:'#0E1B32',
alignItems:'center',
justifyContent:'center'


},

profPhoto:{

  height:windowHeight/5,
  width:windowWidth/3,
  backgroundColor:'green',
  borderRadius:120,
  marginBottom:windowHeight/20

},
profileDetails:{
flex:4,

},

ppText:{
fontSize:16,
color:'grey',
paddingLeft:10,
textTransform:'capitalize'

},

input: {
  width: '95%',
  justifyContent: 'center',
  alignSelf: 'center',
  borderBottomColor:'grey',
  borderBottomWidth:2,
  fontSize:16,
  fontWeight:'bold'
  
  
},
TouchableUpdate:{
  alignSelf:'flex-end',
  paddingRight:10,
  paddingBottom:10,
  position:'absolute',
  bottom:1
  
 
},

})
