import React, { Component,useState,useEffect } from 'react';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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


     const follow = [
      {
                 
        id:0,
        image:"https://picsum.photos/700",
        name: 'Araba',
        postCount: 10,
        followCategory:false
      },
      {
        id:1,
        image:"https://picsum.photos/700",
        name: 'Araba',
        postCount: 10,
        followCategory:false
      },
      {      
        id:2,
        image:"https://picsum.photos/700",
        name: 'Araba',
        postCount: 10,
        followCategory:false
      },
      {
        id:3,
        image:"https://picsum.photos/700",
        name: 'Araba',
        postCount: 10,
       followCategory:false
     },
{
          id:4,
          image:"https://picsum.photos/700",
          name: 'Araba',
          postCount: 10,
          followCategory:false
       },
  {
            id:5,
            image:"https://picsum.photos/700",
            name: 'Araba',
            postCount: 10,
            followCategory:false
         },
    {
              id:6,
              image:"https://picsum.photos/700",
              name: 'Araba',
              postCount: 10,
              followCategory:false
           },
      {
                id:7,
                image:"https://picsum.photos/700",
                name: 'Araba',
                postCount: 10,
                followCategory:false
             },
  ]



const user = firebase.auth().currentUser.uid;
const db = firebase.database();
const dbStore = firebase.firestore();
const ref2 = db.ref('Begeniler/'+`${user}`+'/Begendiklerim');

 export default Kategoriler = ({navigation,route}) => {

  const [list, setList] = useState([]);
  const ref = db.ref('Kategoriler');

  
  

  function getCategory(){

        /* fireStore
          .set({
             follow
          })
          .then(() => {
            console.log('User added!');
          });*/
  

  
  

  ref.on("value",(snapshot)=>{
    if(snapshot.val()){
        const data=snapshot.val();
        const categoryList=Object.values(data) || [];
        console.log(data);
        setList(categoryList);
    }
})
}
  
  useEffect(() => {
    
  
    getCategory();
    
    
    
    },[]);

  
        return (
            <SafeAreaView style = {styles.container}>
               
            <FlatList
            showsVerticalScrollIndicator={false}
            style = {styles.cat}
            data = {list} 
            keyExtractor = {item => item.id}
            renderItem = {({item,index}) => (
            
              <View style = {styles.catItem} index={index} >
             
                <TouchableOpacity>
                <Image source = {{uri: item.image}} style = {styles.loggo}/>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <View style = {{flexDirection: "column" , 
                    justifyContent: "space-around" , 
                    alignItems: "center"}}>
                        <View>
                          <TouchableOpacity
                          onPress={()=>navigation.navigate('MyTabs',{
                            screen: 'Yeni',
                            params:{params:item.name}})} 
                          >   
                        <Text style = {styles.name}>{item.name}</Text>
                        </TouchableOpacity> 
                        <Text style = {styles.text}>{item.postCount}</Text>
                        </View>
                    </View>
                </View>
                <View>
                        <Image style = {{width: 30 , height: 30 , marginTop: 4 }}
                        source = {{uri: 'https://ibb.co/L5WY5X2'}} />
                        </View> 
                        <View index={index}>
            <TouchableOpacity 
            
          onPress={
            
              ()=>{
                 
               
                ref.child(item.id).update({
                  followCategory:!item.followCategory,
                })
                 
                 if(item.followCategory==false){
                    ref2.child(item.id).update(item);
                    ref2.child(item.id).update({
                     followCategory:!item.followCategory
                    });
                    console.log('oldu')
                 }else{
                     ref2.child(item.id).remove();
                     console.log('olmadı')
                 }
              
                
              }

            }
              >
              <Icons
              name={item.followCategory ? 'heart' : 'heart-o'}
              size={20}
              color={'#E02401'}
              
              
              />

             
            </TouchableOpacity>
            </View>
            </View>
            )}
            >
           
            </FlatList>

            </SafeAreaView>
        );
    }
 

 const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#D8E3E7"
    },

    cat: {
        marginHorizontal: 15

    },

    catItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 15,
        flexDirection: "row",
        marginVertical: 8,
        alignItems:'center',
        height:windowHeight/9,
        borderWidth:0.5
    },
    
    loggo: { 
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },

    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },

    text: {
        fontSize: 12,
        color: "#C4C6CE",
        fontWeight: "600",
        marginTop: 10
    }
 });