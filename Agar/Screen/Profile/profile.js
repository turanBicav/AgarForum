import React, { Component,useRef} from 'react';
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

  const user = firebase.auth().currentUser.uid;
  const db = firebase.database();
  
  const ref = db.ref('kullaniciBilgiler/'+`${user}`+'/bilgiler');

  //const userIdd = datas.userId();
   //console.log(userIdd)
  
  

export default class profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      inputValue:props.inputValue,
      resourcePath:{},
      urlPP:'',
      setImageUrl:'null'
     
      
    };
 
    this.touchButtonRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);

    
    
  }
  
  

  handleChange = (e) => {

    this.setState((e) => ref.child(item.key).set(e.target.value));
    
  }

  

   componentDidMount(){
    ref.once('value', (snapshot) =>{
     
      var li = []
      snapshot.forEach((snapshot )=>{
       
       li.push({
        key:snapshot.key,
        val:snapshot.val(), 
      })
      })
   this.setState({list:li})
   console.log(li)
  })

  const user = firebase.auth().currentUser.uid;
  
  //const url =  firebase.storage().ref('profilPhoto/'+`${user}`);
 
   storage()
    .ref('profilPhoto/'+`${user}` + '/profilPhoto') //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
          this.setState({
            setImageUrl:url,
            
          });
        })
        .catch((e) => console.log('Errors while downloading => ', e));

        
  
      
}


selectFile = () => {
  var options = {
    title: 'Select Image',
    customButtons: [
      { 
        name: 'customOptionKey', 
        title: 'Choose file from Custom Option' 
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    
  };

  

  launchImageLibrary(options, (res) => {
    console.log('Response = ', res);

    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      const source =  {uri:res.assets[0].uri} ;
      const name = {fileName: res.assets[0].fileName};
      console.log('response', JSON.stringify(res));
      console.log(source);
      console.log(name);
      this.setState({
        filePath: source,
        fileName: res.assets[0].fileName,
        fileUri: res.assets[0].uri,
      });
     
 
     const fileUri = this.state.fileUri;
     const user = firebase.auth().currentUser.uid;
     const ref = firebase.storage().ref('profilPhoto/'+`${user}`);
    console.log(this.state.fileUri);

   ref
   .child('profilPhoto')    
   .putFile(fileUri)
   .then(async () => {
   console.log(`${this.state.fileName} has been successfully uploaded.`);
   })
   .catch((e) => console.log('uploading image error => ', e));

   
   
  }
   
  });

  
  
}
_handleSubmit = (values) =>{

  const user = firebase.auth().currentUser.uid;
  if(user){
    const profileData = firebase.database().ref('kullaniciBilgiler/'+`${user}`);
    profileData.update({
      age:values.age,
      cinsiyet:values.cinsiyet,
      email:values.email,
      job:values.job,
      liveCity:values.liveCity,
      name:values.name,
      school:values.school,
      schoolLevel:values.schoolLevel,
      surname:values.surname,
    }).then(()=>console.log('işlem tamam usta'))
  }
  alert('başarılı dirrrriririm!');
  

  
}

submitForm = () =>{
  this.touchButtonRef.current.submitForm()
}





  render() {



    return (

      <SafeAreaView style={styles.container} >
       
        <View style={styles.profilePhoto}>
        <TouchableOpacity  onPress={this.selectFile} >
        <Image
            source={{
              
               uri:this.state.setImageUrl 
             
            }}
            style={styles.profPhoto}
          />
           </TouchableOpacity>
          
         
        </View>
        
        <View style={styles.profileDetails}>
        <View style={{flex:1, alignSelf:'center', justifyContent:'center'}}>
       <FlatList 
          data={this.state.list} 
          keyExtractor={(item)=>item.key}
          renderItem={({item})=>{
             return(
            
              <Formik
              innerRef={this.touchButtonRef}
              initialValues={{
               
                val:item.val          
                /*age :item.age,
                cinsiyet: item.cinsiyet,
                email: item.email,
                job: item.job,
                liveCity:item.liveCity,
                name:item.name,
                school:item.school,
                schoolLevel:item.schoolLevel,
                surname:item.surname,*/
              }}
              onSubmit={this._handleSubmit}
              validationSchema={
                Yup.object().shape({
                  /*val: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  cinsiyet: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  email: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  job: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  liveCity: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  name: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  school: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  schoolLevel: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),
                  surname: Yup.string().required(<Text style={{ color: 'red' }}>basarısız soyisim</Text>),*/
                  val: Yup.string().required(<Text style={{ color: 'red' }}>basarısız {item.key}</Text>),
                  

                  
  
                })
              }
            >
              {
                ({
                  values,
                  handleSubmit,
                  isValid,
                  isSubmitting,
                  errors,
                  handleChange
                }) => (
                <View style={{flexDirection:'column',
                width:windowWidth,
                paddingHorizontal:20,
                paddingVertical:10}}>
                   <Text style={styles.ppText}>{item.key}</Text> 
                   <TextInput
                   
                   defaultValue={values=item.val}
                   style={styles.input}
                   onChangeText={handleChange(item.key)}
                   
                  
                   ></TextInput>
                   {errors.val &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.val}</Text>
                   }
         </View>
                   
                 )

                 
                }
                 
              </Formik>
                )
             }}/>
 <TouchableOpacity
     style={styles.TouchableUpdate}
              //disabled={!isValid || isSubmitting}
              onPress={this.submitForm}
              >
              
                <Icon
                name='user-edit'
                size={35}
                color={'#0E1B32'}
                />
              </TouchableOpacity>
              

     </View>   
        
    
   </View>
                   
      </SafeAreaView>
      
    );    
  }
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
