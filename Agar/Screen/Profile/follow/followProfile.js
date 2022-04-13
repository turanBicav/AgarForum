import React, { useEffect,useState } from 'react';
import 
{ 
  Card,
   ListItem,
    Button, 
    Icon,
    Avatar,
    
  } from 'react-native-elements'
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import
 {
    View,
     Text,
     SafeAreaView,
     ScrollView,
     StyleSheet,
     Dimensions,
     Image,
     TouchableOpacity,
     FlatList 


    } from 'react-native';


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const user = firebase.auth().currentUser.uid;
    const db = firebase.database();
    const ref = firebase.database()
    .ref('FollowProfile/'+`${user}/`+'Follow')
   
  
    

export default followProfile = ({navigation}) => {

  const [followList, setFollowList] = useState([])
  const [userFollowList, setUserFollowList] = useState([])


 

   

  useEffect(() => {
    
    function getFollow(){

      ref.once('value').then(snapshot=>{
  
        li=[];
          snapshot.forEach((child) => {
          
            li.push({
               followUser:child.key
            })
           
          } 
      )
      setFollowList(li);
     //Sınırsız dögü sorunu var clg yaz ve gör
      })
  
    }
   
    
    const getFollowProfile=()=>{
   
      followList.map((a)=>{
            return(
              db.ref('kullaniciBilgiler/'+a.followUser)
              .once('value',snapshot=>{
                const data = snapshot.val();
                const list = Object.values(data)
                setUserFollowList(list)
              })
            )
      })
  
    }
    getFollow();
    getFollowProfile();
    return () => {
      
    }

  }, [followList]);
  
    
  


        /*<View style={styles.followBox}>
        <View style={styles.followImage}>
          <Image ></Image>
        </View>
        <View style={styles.followName}>
          <Text style={styles.followNameText}>Ahahah</Text>
        </View>
        <View style={styles.followDelete}>
          <TouchableOpacity style={styles.followDeleteButton}>
            <Text  style={styles.followDeleteButtonText}>Sa</Text>
          </TouchableOpacity>
        </View>
        </View>*/
      
    
    return (
     
      <SafeAreaView style={styles.container}>
     
        
        <FlatList
            data = {userFollowList} 
            keyExtractor = {item => item.id}
            renderItem = {({item,index}) => (
              <View style={styles.follows}>
          <Card>
        <View  style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/agar-19174.appspot.com/o/profilPhoto%2FvkVr3SR5G7MbsbP81YHi2LYVjct2%2FprofilPhoto?alt=media&token=a4c353a6-b453-4698-b58f-f5811b76dc1a'}}
              />
               <TouchableOpacity >
              <Text style={styles.name}>{item.name +' '+ item.surname}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft:15}}>
              
                  
                    <Icon
                      name="delete"
                      size={20}
                      color="blue"
                      
                      />
                    
               </TouchableOpacity>
             
            </View>
        

      </Card>
      </View>
            )
            }
            ></FlatList>
                    
      </SafeAreaView>
    )
  }


const styles = StyleSheet.create({


  container:{
    flex:1,
    backgroundColor:'grey'
   
  },


  followBox:{
    backgroundColor:'white',
    width:windowWidth,
    height:windowHeight/10,
  
  },

  followImage:{
    backgroundColor:'yellow',
    width:windowWidth/4,
    height:windowHeight/10,

  },
  followName:{
    backgroundColor:'purple',
    width:windowWidth/1.8,
    height:windowHeight/10,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft:10
  },
  followNameText:{
    textAlign:'center',
    color:'white',
    fontSize:16,
    
  },

  followDelete:{
    backgroundColor:'yellow',
    width:windowWidth/1.7,
    height:windowHeight/10,
    justifyContent:'center',
    paddingLeft:20
  },
  followDeleteButton:{
   backgroundColor:'red',
   width:50,
   height:20,
   borderRadius:20
  },
  followDeleteButtonText:{
  textAlign:'center'

  },

  user: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingBottom:6,
    alignContent:'center',
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomColor:'grey'

  },
  image: {
    width: 50,
    height:50,
    marginRight: 10,
    borderRadius:50/2
  },
  name: {
    marginTop:6,
    fontSize: 22,
    textTransform:'capitalize',
    width:windowWidth/1.8,
    
  },

})