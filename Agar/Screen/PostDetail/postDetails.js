import React, {useState,useEffect,createContext} from 'react';
import
 {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph ,Divider} from 'react-native-paper';
import auth,{ firebase } from '@react-native-firebase/auth';
import { database } from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const user = firebase.auth().currentUser.uid;
const db = firebase.database();

const ref = db.ref('kullaniciBilgiler/'+`${user}`);
//const refComment = db.ref('yorumlar/'+`${user}`+'/commentData');
const refPost = db.ref('Post');
const refToken = db.ref('Post/');



export default postDetails = ({navigation, route}) => {

    const [currentDate, setCurrentDate] = useState('');
    const [commentName, setcommentName] = useState([]);
    const [commentText, setcommentText] = useState('');
    const [commentData, setcommentData] = useState([]);
    const [postDetailsData, setpostDetailsData] = useState([]);
    const [postingInf, setPostingInf] = useState([]);
    const [posterCategoryName,setPosterCategoryName]=useState(null);
    const { title } = route.params;
    //const {user} = useContext(AuthContext);
    const levelColl = firestore().collection('Level');
    //console.log(title)

    const [levelLabels,setLevelLabels] = useState([]);
    const [levelData,setLevelData] = useState([]);
    const [commentppImageUrl,setcommentppImageUrl] = useState();
    const [posterppImageUrl,setposterppImageUrl] = useState();
    const [postFollow,setPostFollow] = useState(false);
    const [userFollow,setUserFollow] = useState(false);
    const [saveValue,setSaveValue] = useState(saveValue);
    const [postCorrect,setPostCorrect] = useState(false);
    const [fcmTokenData,setFcmTokenData] = useState([]);
    const [followCount,setFollowCount] = useState();
    //const [levelData,setLevelData] = useState([]);
    const [userId,setUserId]=useState([]);
    
    const levelList={
        data:[0.1,0.5,0.6],
        labels:['araba','kitap','oyun']
        //data:levelData,
        //labels:levelLabels
        
        }


        const setCurrentScreen = async screenName => {
            await analytics().setCurrentScreen(screenName, screenName);
            return screenName;
          };

function ppImage(){

  const user = firebase.auth().currentUser.uid;
  storage()
      .ref('profilPhoto/'+`${user}`+'/profilPhoto') //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setcommentppImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));

}


    function getComments(){

        
        //const refComment = db.ref('yorumlar/'+`${user}`+'/commentData');
        
        /*refComment.on("value",(snapshot)=>{
            if(snapshot.val()){
                const data=snapshot.val();
                const comments=Object.values(data) || [];
                
                setcommentData(comments)
            }
        })*/

        refPost.child(title+'/comments').on("value",(snapshot)=>{    
               if(snapshot.val()){
                const data=snapshot.val();
                const comments=Object.values(data) || [];
                setcommentData(comments);
            }
        }
        ) 
     } 



    function getPostingInf(){
     const refPostingİnf =  db.ref('kullaniciBilgiler/');
     refPostingİnf.on("value",(snapshot)=>{
            if(snapshot.val()){
                const data=snapshot.val();
                const comments=Object.values(data) || [];
                //console.log(data);
                setPostingInf(comments)
                
            }else{
                alert('zot')
            }
        })
     }  ///SORUNLU KISIM
     const refPostFollow = db.ref('Post/').child(title+'/Follow');

     function getFollowPost(){

        const refPostFollow = db.ref('Post/').child(title+'/Follow');

        refPostFollow.once("value",snapshot=>{
            
             follow = snapshot.val();
             console.log(follow.length)
             for (let index = 0; index < follow.length; index++) {
                 
                if(follow[index] == user){
                    setPostFollow(true)
                    
                     
                }
                
             }
             
        })
        console.log(postFollow)
     }
   

      function getPost(){
          var list=[];
        refPost.child(title).once("value",(snapshot)=>{    
               if(snapshot.val()){
                list.push({
                text:snapshot.val().text,
                id:snapshot.val().id,
                postTime:snapshot.val().postTime,
                title:snapshot.val().title,
                category:snapshot.val().category,
                nameSurname:snapshot.val().nameSurname,
                
                }
                );
                
                setpostDetailsData(list);
                posterId(snapshot.val().id)
                   //console.log(snapshot.val().text)
                   //console.log(child.val().title,'tamam',child.val())
                   //const data =snapshot.val();
                   //const postDetails = Object.values(data) || [];
                   //setpostDetailsData(postDetails);
                   //console.log(data)
               }else{
                   //console.log('eşleşmedi')
               }
            });
            
        
        
      }

      
     
    

const updateLevelList = (levelListData,followListData) => {
    setLevelData(levelListData)
     // Update the state here
    levelColl.doc(user)
 .set(
    levelListData // Use the same function arg instead of using state
 )
    
 }
 

//  const posterIdd = (id,category)=>{
//    setPosterId(id);
//     //console.log(category)
//     category.map(a=>{
//         //console.log(a.name)
//         setPosterCategoryName(a.name);

//     })
//    levelColl
//    .doc(id)
//    .get()
//    .then(documentSnapshot=>{
//        data=documentSnapshot.data();
//        console.log('vava',data)
//    })
//  }


function getPostInfo(){
    const ref = db.ref('Post/'+title);
    ref.on("value",snapshot=>{
     
      if(snapshot.val()){
       
        const count=snapshot.child('Follow/count').val()
        setFollowCount(count)
      }
        
        
      });

  }

 
 
 function StoreLevelData(){


    levelColl
      .doc(user)
      .get()
      .then(documentSnapshot=>{
          data=documentSnapshot.data();
          labels=data.levelList.labels;
          data1=data.levelList.data;
          //console.log(data)
          for (let index = 0; index < labels.length; index++) {
            //console.log(labels[index],data[index])
           
            if(labels[index] == 'araba'){
                if(postFollow == false){

              data1[index]+=0.0051
              //console.log(data1[index])   
              setPostFollow(current => !current)
              refPostFollow.child(user).update({      
                follow:true     
        }),

           refPostFollow.child('count').transaction(count=>{   
                    if(count === null ) return 1;
                    else
                    return count=count+1;
           })
                }else{

                  data1[index]-=0.0051
                  //console.log(data1[index])   
                  setPostFollow(current => !current) 
                  refPostFollow.child(user).remove(),

                  refPostFollow.child('count').transaction(count=>{   
                    return count=count-1;
           })
              
            }
            }
          }
          updateLevelList(data,postFollow) 
          
      })
    }

    function UserFollowData(posterUser){
        
        const userFollowRef = db.ref('FollowProfile/'+`${user}`)
        const userFollowerRef = db.ref('FollowProfile/'+posterUser)
        setUserFollow(current=>!current);

        if(userFollow){
        userFollowRef.child('Follow/'+posterUser).update({
               status:userFollow
           
        }
       
         
        )
        userFollowerRef.child('Follower/'+`${user}`).update({
            status:userFollow
        })
    }else{
        userFollowRef.child('Follow/'+posterUser).remove()
        userFollowerRef.child('Follower/'+`${user}`).remove()
    }
    
    }


 function getUserFollowData(posterUser){
    const userFollowRefi = db.ref('FollowProfile/'+`${user}`)

    userFollowRefi.child('Follow/'+posterUser).once('value').then(snapshot=>{
        snapshot.forEach((snapshot)=>{
            //setUserFollow(snapshot.val())
            console.log('deger',snapshot.val());

        })
    })
 }

 function NotificationOptions(){
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
  
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  
    messaging().onMessage(async remoteMessage => {
        console.log('notification state....',remoteMessage)
    });
  
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  
    
    const unsubscribe = messaging().onMessage(
      async (remoteMessage) => {
        alert('A new FCM message arrived!');
        console.log(
          'A new FCM message arrived!',
          remoteMessage
        );
      }
    );
  
    return unsubscribe;
  }

  
  const checkToken = async () =>{
    const fcmToken = await messaging().getToken();
    if(fcmToken && saveValue===true &&postCorrect===true){
      NotificationOptions()
      PushNotification.localNotification({
        title: "My zaze Title", // (optional)
        message: "My zaze Message", // (required)
        
      });
    }
  }



  async function sendTokens(){
    const fcmToken =  await messaging().getToken();
      console.log('fcm', fcmToken)
      const refToken = db.ref('Post/');
  
      refToken.child(title+'/Tokens').once("value",(snapshot)=>{    
          if(snapshot.val()){
           snapshot.forEach((child)=>{
               if(child.key === fcmToken){
                refToken.child(title+'/Tokens/'+fcmToken).remove()
                setSaveValue(current => !current);
               }
              
           })
       }
   }) 
       refToken.child(title+'/Tokens').child(fcmToken).set({  
          value:true
       })  
       setSaveValue(current => !current)
       console.log('save',saveValue)
    }

    async function getSaveValue(){
      const fcmToken =  await messaging().getToken();
      console.log('fcm', fcmToken)
      const refToken = db.ref('Post/');
  
      refToken.child(title+'/Tokens/'+fcmToken).on("value",(snapshot)=>{    
          if(snapshot.val()){
          setSaveValue(snapshot.val().value)
       }
   }) 
    }

  function setPostCorrectData(){

      const refPost = db.ref('Post/');
  if (postCorrect === true) {
    refPost.child(title).update({
      correct:false
      })
    
  }else{
    refPost.child(title).update({
      correct:true
      })
  }
      
    
    }

    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
      );
      
    
      ref.once('value').then(snapshot=>{

      
        var list=[]
        
          snapshot.forEach((child) => {
            list.push(
               child.val().name + ' '+ child.val().surname
            )
          }
          
      )
      
       setcommentName(list)
      
      });

      refPostFollow.child(user).once('value').then(snapshot=>{
        snapshot.forEach((snapshot)=>{
            setPostFollow(snapshot.val())
        })
    })

    refPost.child(title).on('value',snapshot=>{
      console.log('dogru mu ? ',snapshot.val().correct)
      setPostCorrect(snapshot.val().correct)
    })
    
    
      getComments();
      getPost();
      getPostingInf();
      ppImage();
      getPostInfo();
      getSaveValue();
      checkToken();

      firebase.analytics().logEvent('goruntulenme',{
          page_title:title,
          count:1
      });


    //   refComment.once('value').then(snapshot=>{

    //     var li=[]

        
    //       snapshot.forEach((child) => {
            
    //         li.push({
    //         //    avatarIcon : child.val().avatarIcon,
    //         //    commentText : child.val().commentText,
    //         //    name : child.val().name,
    //         //   time : child.val().time,
    //         //   id : child.key
    //             key:child.key,
    //             comment:child.val()
    //         }   
    //         )

    //       }
          
    //   )
    //    setcommentData(li)
    //    console.log(li);
    //   })

  
 } ,[postFollow,userFollow]);


 


 

// let initcommentData = [
//     {
//         id:1,
//         avatarIcon:'alien',
//         name:'Turan Bicav',
//         time:currentDate,
//         commentText: 'ali veli kırk dokuz elli'


//     },
//     {
//         id:2,
//         avatarIcon:'alien',
//         name:'Cansu Bicav',
//         time:currentDate,
//         commentText: 'ali veli kırk dokuz elli'


//     }
// ];



  





const sendComment = ()=>{

  let data ={
    avatarIcon:'alien',
    name:commentName,
    time:currentDate,
    commentText:commentText,
}
   let cData = commentData;
   cData.push(data);
   setcommentData(cData);
   setcommentText('');
   const refComment1 = db.ref('Post/');
   refComment1.child(title + '/comments').set(commentData)
   
}
return(
  <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.headerBarView}>
      <TouchableOpacity style={{position: 'absolute', left:10}}
       onPress={()=>navigation.goBack()}
      >
            <Icon name='arrow-left'
             style={styles.Icons} 
             />
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', right:60}}
              onPress={()=>sendTokens()}
              >
            <Icon name='bookmark'
             color={saveValue === true ? '#FF3F00' : '#8D8DAA'}
             size={18}
             />
            </TouchableOpacity>
            <TouchableOpacity style={
                {position: 'absolute', right:10}}
            
                >
            <Icon name='share-square'
             style={styles.Icons} 
             />
            </TouchableOpacity>
            
      </View>
      
      <FlatList
        data={postDetailsData}
        keyExtractor={(item)=>item.key}
        renderItem={({item,index})=>{
            
            {
                storage()
                .ref('profilPhoto/'+item.id+'/profilPhoto') //name in storage in firebase console
                .getDownloadURL()
                .then((url) => {
                 setposterppImageUrl(url);
                 
                })
                .catch((e) => console.log('Errors while downloading => ', e))
            }
            {
                getUserFollowData(item.id);
            }
            
           return(
      <Card style={{marginBottom:5}}>
     
           <View style={styles.questionBoxView}>
      <View style={styles.questionTitleView}>

       <Text style={styles.questionTitleText}>
           {item.title}
       </Text>
       </View>
       <View style={styles.questionerProfileView}>
           
       <Image source={{uri:posterppImageUrl}}
       style={styles.AvatarImage}
       />  
       <Text style={styles.UserNameText}>{item.nameSurname}</Text>
       {
       item.id == user ?
    
            <TouchableOpacity style={styles.SolutionPosterTouch}
            onPress={()=>setPostCorrectData()}
            >
                <Icon 
                    size={18}
                    name={'check'}
                    color={postCorrect === true ? '#FF3F00' : '#8D8DAA'}
                    >
                    </Icon>
            </TouchableOpacity>
      
        :

            <TouchableOpacity style={styles.followPosterTouch}
            onPress={()=>UserFollowData(item.id)}
            >
                <Text style={styles.followPosterTouchText}>
                    {!userFollow ? 'Takibi Bırak' : 'Takip Et' }
                    </Text>
            </TouchableOpacity>
           
           
       }
       </View>
       <View style={styles.questionTime}> 
       <Text style={styles.PostTimeText}>
             Soru: Bugun
       </Text>
       <Text style={styles.PostTimeText} >
           Aktivite: Bugun
       </Text>
       <Text style={styles.PostTimeText}>
          Görenler : 20
       </Text>
       </View>
       <View style={styles.questionDetailsView}>
        <Text style={{fontSize:15,padding:10}}>{item.text}</Text>
        
       </View>
       <View style={styles.categoryBoxes}>
           {item.category.map((a,b)=>{
        

                return <TouchableOpacity 
                style={styles.categoryBoxesTouch}
                onPress={()=>navigation.navigate('MyTabs',{
                    screen: 'Yeni',
                    params:{params:a.name}})} 
                >
            <Text style={styles.categoryBoxesText}>{a.name}</Text>
           </TouchableOpacity> 
        
           })}
         </View>  
       
       <View style={styles.likedThisPost}>
       <TouchableOpacity
       onPress={()=>StoreLevelData()}
       style={styles.likeTouch}
       >
           <IconFont name={!postFollow ? 'thumbs-o-up' :'thumbs-up'}
           style={{paddingHorizontal:10}}
           >
          
           </IconFont>
           <Text style={styles.likeText}>BEĞEN</Text>
        </TouchableOpacity >
        <View style={{marginVertical:5}}>
        <Text>------ {followCount} kişi beğendi ------</Text>
        </View>
        <View style={styles.likeAvatarView}>
        <TouchableOpacity style={styles.likeAvatarTouch}>
        <Icon name='user-circle'
             style={styles.likeIcons} />
             </TouchableOpacity>

             <TouchableOpacity style={styles.likeAvatarTouch}>
        <Icon name='user-circle'
             style={styles.likeIcons} />
             </TouchableOpacity>


             <TouchableOpacity 
             style={styles.likeAvatarTouch}
             >
        <Icon name='user-circle'
             style={styles.likeIcons} />
             </TouchableOpacity>

             <TouchableOpacity style={styles.likeAvatarTouch}>
        <Icon name='user-circle'
             style={styles.likeIcons} />
             </TouchableOpacity>
             </View>
             
       </View>
      </View>
      
      
        
        </Card>
          )
        }
    }

    
    />
      <Card>
      <View style={styles.answerDetailsView}>
      <View style={styles.allContentView}>
          <Text style={styles.allContentText}>Tüm yorumlar</Text>
        </View>
        <Divider/>
        
        <FlatList
        data={commentData}
        keyExtractor={(item)=>item.key}
        renderItem={({item,index})=>{
           return(

            <View 
            index={index}
            style={styles.contentView}>
            <View style={styles.commentatorDetailView}>
                <View style={styles.commentatorAvatarView}>
                   <Image
                   style={styles.ppImage}
                   resizeMode='cover'
                   source={{uri:commentppImageUrl}}
                   />
                </View>
                <View style={styles.commentatorNameAndTimeView}>
                   <Text>{item.name}</Text>
                   <Text>{item.time}</Text> 
                </View>
                <View style={styles.commentatorLikeView}>
                    <TouchableOpacity>
                        <Icon
                        name='thumbs-up'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentTextView}>
            <Text style={styles.contentText}>
                {item.commentText}
            </Text>
            </View>
          </View>
               
           ) 
        }}
       
        />
        
        
      </View>
      </Card>
     
      
  
    </ScrollView>

    <View style={styles.entryCommentView}>
      <TextInput
      style={styles.commentTextInput}
      label="Email"
      value={commentText}
      onChangeText={commentText => setcommentText(commentText)}
      placeholder='Ne düşünüyorsunuz? '
    />
    {
       // console.log(commentText)
    }
    <TouchableOpacity>
    <Icon
    name='comment-dots'
    size={25}
    />
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>sendComment()}
    >
    <Icon
    style={{marginLeft:15}}
    name='thumbs-up'
    size={25}
    />
    </TouchableOpacity>
      </View>
  </SafeAreaView>
);
};



const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#D3DEDC'
        

    },
    headerBarView:{
        justifyContent:'center',
        alignItems:'center',
        height:windowHeight/15,
        backgroundColor:'#0E1B32'
      
    },

    Icons:
    {
        fontSize:20,
        color:'white'
    },

    questionBoxView:{
     

    },
    SolutionPosterTouch:{
        right:20,
        position:'absolute',
        paddingVertical:3,
        paddingHorizontal:10,
        backgroundColor:'transparent',
        borderRadius:1
    },

    followPosterTouch:{
        right:20,
        position:'absolute',
        borderWidth:2,
        borderColor:'#FF3F00',
        paddingVertical:3,
        paddingHorizontal:10,
        backgroundColor:'transparent',
        borderRadius:1
    },

    followPosterTouchText:{
     color:'#FF3F00',
     fontSize:12
    },
    questionerProfileView:{
        height:windowHeight/20,
        width:windowWidth,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10
    },
    AvatarImage:{
        width:25,
        height:25,
        borderRadius:25/2,
        marginRight:25/2
    },
    ppImage:{

        width:30,
        height:30,
        borderRadius:30/2,
      },
    UserNameText:{

    },
    questionTitleView:{
        width:windowWidth,
        paddingVertical:10,
        paddingLeft:10   
    },
    questionTitleText:{
     fontSize:25,
     textAlign:'left'
    },

    questionTime:{
        height:windowHeight/25,
        width:windowWidth,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end',
      
    },

    PostTimeText:{
        color:'#2B2B2B'
    },
    questionDetailsView:{
        width:windowWidth,
        height:windowHeight/3,
        padding:10
    },
    categoryBoxes:{
        width:windowWidth,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        
    },

    categoryBoxesTouch:{

        borderWidth:1,
        borderRadius:1,
        borderColor:'grey',
        padding:5,
        borderStyle:'dotted'
    },

    categoryBoxesText:{
        color:'grey'
    },
    likedThisPost:{
        width:windowWidth,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:30
    },

    likeTouch:{
        borderWidth:2,
        borderColor:'#FF3F00',
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor:'transparent',
        borderRadius:1,
        flexDirection:'row'

    },

    likeText:{
     
        color:'#FF3F00',
        fontSize:12
    },

    likeAvatarView:{
        flexDirection:'row',
      
    },
    likeAvatarTouch:{

        margin:5
     
    },

    likeIcons:{
    color:'black',
    fontSize:30
    },
    
    answerDetailsView:{
        width:windowWidth,
        marginBottom:50
    },

    allContentView:{
       
    height:windowHeight/20,
    justifyContent:'center',
    paddingLeft:5

    },
    allContentText:{

    textAlign:'left',
    fontSize:16,
    fontWeight:'700'

    },
    contentView:{
      
        borderStyle: 'dotted',
        borderWidth:1,
        borderRadius:1
    },
    contentText:{

    },

    commentatorDetailView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,

    },
    commentatorAvatarView:{
        marginRight:10

    },
    commentatorNameAndTimeView:{

    },
    
    commentatorLikeView:{
      position:'absolute',
      right:20,
      
    },

    contentTextView:{
    paddingLeft:50,
    paddingRight:10,
    marginVertical:10

    },
    contentText:{

    },
    entryCommentView:{
        backgroundColor:'white',
        width:windowWidth,
        height:50,
        paddingHorizontal:10,
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
        position: "absolute", bottom: 0, right: 0
        
        
    },
    commentTextInput:{
         backgroundColor:'#D3DEDC',
         width:windowWidth/1.3,
         borderRadius:40/5,
         marginRight:10,
         paddingLeft:10,
         

    }
   
})


PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);

    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  

    
    
  
   
  });
