import React, { Component,useState,useEffect } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import 
{ 
  View,
   Text,
   StyleSheet,
   SafeAreaView,
   ScrollView,
   Dimensions,
   TouchableOpacity,
   FlatList
   } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const user = firebase.auth().currentUser.uid;
const db = firebase.database();

export default followCategory = () => {
  
  const [list, setList] = useState([]);

  const ref = db.ref('Begeniler/'+`${user}`+'/Begendiklerim');
  

   function getFollowCategory(){

    ref.on("value",(snapshot)=>{
      if(snapshot.val()){
          const data=snapshot.val();
          const followCategoryList=Object.values(data) || [];
          console.log(data);
          setList(followCategoryList);
      }else{
        console.log('bastı kaçtı')
      }
  })
 

   }

    useEffect(()=>{

      getFollowCategory();

    },
    []);

    return (
      <SafeAreaView style={styles.container}>
      <FlatList
            showsVerticalScrollIndicator={false}
            data = {list} 
            keyExtractor = {item => item.id}
            numColumns={2}
            renderItem = {({item,index}) => (
              
      <View style={styles.boxScreen} >
         <Card
     key={item.id}
     
      style={styles.topicBox}>
    <Card.Title title={item.name}/>
    
    <Card.Cover source={{ uri: item.image }}
    
    />
    <Card.Content>
      <Paragraph>
      {item.postCount}
      </Paragraph>
    </Card.Content>
    <Card.Actions >
      <TouchableOpacity>
        <Text>Kategoriye Git</Text>
      </TouchableOpacity>
      
    </Card.Actions>
  </Card>
       </View>
            )}
            >

            </FlatList>
      </SafeAreaView>
     
    )
          }


const styles = StyleSheet.create({

  container:{
    flexDirection:'row',
    flex:1,
    width:windowWidth,
    backgroundColor:'grey'
   

  },

  boxScreen:{

    flexDirection:'row'
  },
  topicBox:{
    height:300,
    width:windowWidth/2.2,
    margin:8,

    
  },
  

})
