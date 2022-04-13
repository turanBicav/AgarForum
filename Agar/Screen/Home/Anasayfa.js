import React, { useState,useEffect } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ActionButton from 'react-native-action-button';
import storage from '@react-native-firebase/storage';
import * as Analytics from '@react-native-firebase/analytics';


import 
{ 
  View,
   Text,
   StyleSheet,
   SafeAreaView,
   ScrollView,
   Dimensions,
   TouchableOpacity,
   Image,
   FlatList
   } from 'react-native';

  

   
   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;


   const users = [
    {
       name: 'Turan Bicav',
       avatar: 'https://picsum.photos/700',
       selectedCategory:[
       {
           id:0,
           category:'aa'
               },
     {
             id:1,
            category:'bsad'
                },
    {
        id:2,
        category:'c13'
          },
       ]
    },
];



const user = firebase.auth().currentUser.uid;
const db = firebase.database();
const refPoster = db.ref('kullaniciBilgiler/');
const ref1 = db.ref('Post/');



export default Anasayfa = ({navigation,route}) => {



 

const [list, setList] = useState([]);
const [category, setCategory] = useState([]);
const [ppImageUrl,setppImageUrl] = useState();
const [posterppImageUrl,setposterppImageUrl] = useState();
const [posterData,setposterData] = useState([]);
const [followCount, setFollowCount] = useState([]);

/*function ppImage(){

  const user = firebase.auth().currentUser.uid;
  storage()
      .ref('profilPhoto/'+`${user}`+'/profilPhoto') //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setppImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));

}*/



function getComments(){

  const user = firebase.auth().currentUser.uid;
  const db = firebase.database();
  const ref = db.ref('Post/');

  ref.once("value",snapshot=>{
   
    li=[];
    if (snapshot.val()) {
      
        
    snapshot.forEach(child => {
     
      li.push({
        id:child.val().id,
        nameSurname:child.val().nameSurname,
        postTime:child.val().postTime,
        text:child.val().text,
        title:child.val().title,
        category:child.val().category,
        follow:child.child('Follow/count').val(),
        commentCount:child.child('comments').numChildren(),
      })
      
    });
    console.log(li)
    setList(li)
}

}
  )
}


function getPostInfo(){
  const ref = db.ref('Post/');
  ref.once("value",snapshot=>{
   
    if(snapshot.val()){
      
      li=[];
      snapshot.forEach((child) => {
         
        li.push(
          child.child('Follow/count').val(),
          
        )
    
        
      });
      setFollowCount(li)
      console.log('asd',li)
    }
      
      
    });    
  
}

 function getPosterData(){

  
   list.map((item,index)=>(
    
     storage()
    .ref('profilPhoto/'+item.id+'/profilPhoto') //name in storage in firebase console
    .getDownloadURL()
    .then((url) => {
     setposterppImageUrl(url);
     console.log(url)
    })
    .catch((e) => console.log('Errors while downloading => ', e))

  ))

}



useEffect(() => {
  

  firebase.analytics().logEvent("buttonPressed");
  getComments();
  getPostInfo();
  //ppImage();
  //getPosterData();
  //requestUserPermission();
  //NotificationListener();

  

  return()=>{
    
  }
  },
  
  []);

 
    return (

      
      <SafeAreaView style={styles.container}>
     
     <FlatList
        data={list}
        keyExtractor={(item)=>item.key}
        renderItem={({item,index})=>{
          {
            console.log(item.id)
            storage()
            .ref('profilPhoto/'+item.id+'/profilPhoto') //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
             setposterppImageUrl(url);
             console.log('zaa')
            })
            .catch((e) => console.log('Errors while downloading => ', e))
            
           
            /*refPoster.child(item.id).on("value" , snapshot=>{
                  if(snapshot.val()){
                       const data = snapshot.val();
                       const posterData = Object.values(data) || [];
                       setposterData(posterData);
                       console.log(data)
                  }else{
                      alert('bos dirim')
                  }
            }
            )*/
            
        }
           return(
            <Card
      key={index}
       style={styles.cardBox}>
  <View style={styles.cardTopView}>
    <View key={index} style={styles.ppImageView}>
    <Image
    style={styles.ppImage}
    resizeMode='cover'
    source={{uri:posterppImageUrl}}
   
    />
    </View>
    <View style={styles.nameAndTimeView}>
      <TouchableOpacity
        onPress={()=>navigation.navigate('OtherProfileNav',
        {screen:'otherProfileScreen',
        params:{params:item.id}
           })}
      >
       <Card.Title style={styles.cardTitleName}>
         {item.nameSurname }
         </Card.Title>
         </TouchableOpacity>
    <Text style={styles.timeText}>4 Saat Önce</Text>
    </View>
    </View>
    <Card.Divider/>
    <TouchableOpacity 
    onPress={()=>navigation.navigate('postDetails',{title:item.title})}
    >
     <Card.Title style={styles.cardTitleQuestion}>{item.title}
     
     </Card.Title>
     </TouchableOpacity>
   <Text style={styles.questionDetailText}>
      {item.text}
     </Text>
    <View style={styles.selectedCategoryView}> 
    {  
        item.category.map((v,t)=>{
         return <TouchableOpacity
         onPress={()=>navigation.navigate('MyTabs',{
          screen: 'Yeni',
          params:{params:v.name}})} 
         
         >
           <View 
  
           style={styles.selectedCategoryBox} 
           key={index}
           >
         
           <Text style={styles.selectedCategoryText}>
            {v.name}
              </Text>
         
           </View>
           </TouchableOpacity>
           }
           )
           

        }
</View>
    <Card.Divider/>
   
     
    <View style={styles.detailsPostView}>
     <Text style={styles.detailsPostCountText}>{item.follow}</Text>
     <Text style={styles.detailsPostText}>Beğeni</Text>
    
    <Text style={styles.detailsPostCountText}>{item.commentCount}</Text>
    <Text style={styles.detailsPostText}>Yorum</Text>
   <Text style={styles.detailsPostCountText}>1000</Text>
    <Text style={styles.detailsPostText}>votes</Text>
    </View>
      
       
     
       
        
    
   
  </Card>


           )
        }
      }
    />
      <ActionButton
       style={styles.postAddTouch}
       buttonColor="rgba(231,76,60,1)"
       //onPress={() => this.props.navigation.navigate('Post')}
              >
                <Icons
                
                name='plus'
                size={40}
          
                />

          <ActionButton.Item buttonColor='#9b59b6' 
          title="Soru Sor"
          onPress={() =>navigation.navigate('Post')}>
            <Icon 
            name="question-answer" 
            style={styles.actionButtonIcon}
            color="white"
            size={20}
            />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' 
          title="Düşünce Paylaş" 
          onPress={() =>navigation.navigate('Post1')}>
            <Icon 
            name="lightbulb" 
            color="white"
            style={styles.actionButtonIcon} 
            />
          </ActionButton.Item>
          <ActionButton.Item 
          buttonColor='#1abc9c' 
          title="Konu oluştur" 
          onPress={() => {props.history.push('../Post/post.js')}}>
            <Icon 
            name="edit" 
            style={styles.actionButtonIcon} 
            color="white"/>
          </ActionButton.Item>
              </ActionButton> 

      </SafeAreaView>
     
    )
  };

  

const styles = StyleSheet.create({

  container:{
    //flexDirection:'row',
    flex:1,
    width:windowWidth,
    
    //flexWrap:'wrap',
    backgroundColor:'#D8E3E7',
   
   


  },

  selectedCategoryBox:{
  
    margin:10,
    borderWidth:0.4,
    borderColor:'#536162',
    padding:8,
    backgroundColor:'#D8E3E7',
    

  },

  selectedCategoryView:{
    
    flexDirection:'row',
    
  },

  selectedCategoryText:{
    color:'#212121',
    textAlign:'center',
   
    fontSize:12
  },

  cardTopView:{
    flexDirection:'row'
  },
  ppImageView:{

    flexDirection:'column'
  },

  ppImage:{

    height:40,
    width:40,
    borderRadius:40/2,
    marginRight:10
  },

  nameAndTimeView:{
    flexDirection:'column',
    marginBottom:10

  },

  cardTitleName:{
    marginBottom:0
  },

  timeText:{
    fontSize:12,
    color:'#444444'
  },

  cardTitleQuestion:{ 
    fontSize:15,
    color:'#1597E5'
  },

  questionDetailText:{
    marginBottom: 10,
    color:'#444444'
  },

  

  detailsPostView:{

    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    
  },

  detailsPostCountText:{

  fontSize:22,
  fontWeight:'bold'

  },
  detailsPostText:{
    marginLeft:-15,
    marginTop:5
  },

  boxScreen:{
    flex:1,
    
  },

  
  /*cardBox:{
    position:'relative',
    width:windowWidth,
    

    
  },*/
  postAddTouch:{
    alignSelf:'flex-end',
    paddingRight:10,
    paddingBottom:10,
    position:'absolute',
    bottom:1
   

    
   
  },


})

