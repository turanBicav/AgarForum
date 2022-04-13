import React, { Component } from 'react';
import { Card, ListItem, Button, Icon,Avatar } from 'react-native-elements'
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
     TouchableOpacity


    } from 'react-native';


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const user = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('FollowProfile/'+`${user}/`+'FollowProfile')
   
    //const { otherUser } = route.params;
    

export default class followerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
    };


    ref.on('value',(snapshot)=>{

      var li=[];

      
        snapshot.forEach((child) => {
          
          li.push({
            key:child.key,
            name:child.val().name,
            avatar:child.val().avatar
          })

        }
        
    )
    
      this.setState({list:li})
     console.log(li)
    
    })
    
  }

  


  render() {

    var box = [];
    var lis=[] 
    lis=this.state.list
      box.push(
        <Card 
        key={lis.keys}
        >
        {lis.map((key, index) => {
          return (
            <View key={key.key} style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: key.avatar }}
              />
               <TouchableOpacity >
              <Text style={styles.name}>{key.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft:15}}>
              
                  
                    <Icon
                    
                      name="delete"
                      size={20}
                      color="blue"
                      
                      />
                    
               </TouchableOpacity>
             
            </View>
          );
        })}
      </Card>

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
      )
    
    return (
      <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.follows}>
        {box}
        </View>
      </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({


  container:{
    
    
    flexDirection:'column',
    flex:1,
   
  },

  follows:{
     flexDirection:'column'
  },

  followBox:{
    backgroundColor:'white',
    flexDirection:'row',
    width:windowWidth,
    height:windowHeight/10,
    marginVertical:10
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
    width: windowWidth/7,
    height:windowHeight/12,
    marginRight: 10,
    borderRadius:windowWidth/2
  },
  name: {
    marginTop:6,
    fontSize: 22,
    textTransform:'capitalize',
    width:windowWidth/1.8,
    
  },

})