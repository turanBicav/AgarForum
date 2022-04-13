import React, { Children, Component } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ActionButton from 'react-native-action-button';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import post from '../Post/post';
import post1 from '../Post/post1';


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



export default class Anasayfa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }

  onPressQuestion = (navigation)=>{
    this.props.navigation.navigate('post1')
    }
    


  componentDidMount(){

    const user = firebase.auth().currentUser.uid;
    const db = firebase.database();

    const ref = db.ref('Post/');

      ref.once('value',(snapshot)=>{

        var li=[]

        
          snapshot.forEach((snapshot) => {
            
            li.push(
            
               snapshot.val(),
             
            )

          }
          
      )
      
        this.setState({list:li})
        this.setState(li)
        console.log(li)
      
      })
    }

    
 

  render() {


    return (

      
      <SafeAreaView style={styles.container}>
     
     <FlatList
        data={this.state.list}
        keyExtractor={(item)=>item.key}
        renderItem={({item,index})=>{
           return(
            <Card
      key={index}
       style={styles.cardBox}>
  <View style={styles.cardTopView}>
    <View key={index} style={styles.ppImageView}>
    <Image
    style={styles.ppImage}
    resizeMode='cover'
    source={{uri:item.avatar}}
   
    />
    </View>
    <View style={styles.nameAndTimeView}>
    <Card.Title style={styles.cardTitleName}>{item.name}</Card.Title>
    <Text style={styles.timeText}>4 Saat Önce</Text>
    </View>
    </View>
    <Card.Divider/>
    <TouchableOpacity>
     <Card.Title style={styles.cardTitleQuestion}>{item.title}
     </Card.Title>
     </TouchableOpacity>
   <Text style={styles.questionDetailText}>
      {item.text}
     </Text>
    <View style={styles.selectedCategoryView}> 
    
         <TouchableOpacity>
           <View 
  
           style={styles.selectedCategoryBox} 
           key={index}
           >
          {
            this.state.list.map((a,i)=>
            a.category.map((v,t)=>
           <Text style={styles.selectedCategoryText}>
             {v.name}
             </Text>
            ))
        }
           </View>
           </TouchableOpacity>
</View>
    <Card.Divider/>
    <View style={styles.detailsPostView}>
     <Text style={styles.detailsPostCountText}>1000</Text>
     <Text style={styles.detailsPostText}>votes</Text>
     <Text style={styles.detailsPostCountText}>1000</Text>
     <Text style={styles.detailsPostText}>votes</Text>
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
          onPress={() => this.onPressQuestion()}>
            <Icon 
            name="question-answer" 
            style={styles.actionButtonIcon}
            color="white"
            size={20}
            />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' 
          title="Düşünce Paylaş" 
          onPress={() => this.props.navigation.navigate('post1')}>
            <Icon 
            name="lightbulb" 
            color="white"
            style={styles.actionButtonIcon} 
            />
          </ActionButton.Item>
          <ActionButton.Item 
          buttonColor='#1abc9c' 
          title="Konu oluştur" 
          onPress={() => {}}>
            <Icon 
            name="edit" 
            style={styles.actionButtonIcon} 
            color="white"/>
          </ActionButton.Item>
              </ActionButton> 

     

             
    
      </SafeAreaView>
     
    );
  }
}

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
