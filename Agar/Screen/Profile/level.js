import React, { useContext,useState,useEffect} from 'react';
import 
{ View,
   Text,
   SafeAreaView,
   StyleSheet,
   Dimensions ,
   FlatList
  } from 'react-native';
import {
  ProgressChart,
  
} from "react-native-chart-kit";
import PagerView from 'react-native-pager-view';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Navigation/AuthProvider'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const chartConfig = {
  backgroundGradientFrom: "#ECAD55",
  backgroundGradientFromOpacity: 0,
  //backgroundGradientTo: "#0E1B32",
  backgroundGradientToOpacity:0,
  color: (opacity = 1) => `rgba(255,0,255, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false ,// optional
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}



export default level = () => {

    const {user} = useContext(AuthContext);
    const userr = firebase.auth().currentUser.uid;
    const db = firebase.database();
    const ref = db.ref('LevelData/'+`${userr}`);
    const levelColl = firestore().collection('Level');
    const [levelList, setlevelList] = useState([]);
    const [storeLevelList, setStoreLevelList] = useState([]);





    /*levelColl
    .doc(user.uid)
    .set({
       levelList

    }
    )*/
    

//   const Top3data = {
//    labels: ["Swim", "Bike", "Run"], // optional
//    data: [0.5, 0.6, 0.8],
 
//  };

//  const data = {
//   labels: ["Swim"], // optional
//  data: [0.5],

//     };
  


//  ref
//  .set({
//    data:data,
//    Top3Data:Top3data
//  })
//  .then(()=>console.log('Data gönderildi'))

    

    function getTop3List(){

      ref.on("value",(snapshot)=>{
        if(snapshot.val()){
            const data=snapshot.val();
            const levelListData=Object.values(data) || [];
            //console.log(data);
            setlevelList(levelListData);
        }else{
          console.log('bastı kaçtı')
        }
    })

    }

    function StoreLevelList(){
      levelColl
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
    
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          const levelListData=Object.values( documentSnapshot.data()) || [];
          setStoreLevelList(levelListData)
        }
          });
    }

    /*function StoreLevelData(){
      levelColl
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
      
        data=documentSnapshot.data();
        labels=data.levelList.labels;
        data=data.levelList.data;
        for (let index = 0; index < labels.length; index++) {
          console.log(labels[index],data[index])
          
          if(labels[index] == 'Swim'){
            data[index]+=0.1
            console.log(data[index])
          }
          
        }


        
          });
    }*/




    
    useEffect(() => {
      getTop3List();
      StoreLevelList();
      //StoreLevelData();
    }, [])


    
 
   
    return (
      <SafeAreaView style={styles.container}>
       
          <View  style={styles.topChart}>
            <View style={styles.topThird}>
              <Text style={styles.topThirdtext}>
                EN İYİ 3
                </Text>
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data = {storeLevelList} 
            keyExtractor = {item => item.id}
            numColumns={2}
            renderItem = {({item,index}) => (
            <ProgressChart
              key={index}  
              data={item}
              width={400}
              height={260}
              strokeWidth={16}
              radius={32}
              hideLegend={false}
              strokeWidth={20}
              chartConfig={chartConfig}
/>
            )}
            ></FlatList>
      </View>

      <PagerView style={styles.botChart}  initialPage={0}>
        <View style={{flexDirection:'row'}} key='0'>
        <View style={styles.botChartsView} >
        <FlatList
            showsVerticalScrollIndicator={false}
            data = {levelList} 
            keyExtractor = {item => item.id}
            numColumns={2}
            renderItem = {({item,index}) => (      
    <ProgressChart
    key={index}
    data={item.data}
    width={120}
    height={180}
    strokeWidth={20}
    radius={32}
    hideLegend={false}
    strokeWidth={20}
    chartConfig={chartConfig}
/>
            )
            }
            ></FlatList>

</View>
        </View>
      </PagerView>
      
      </SafeAreaView>
    );
  }
const styles = StyleSheet.create({

  container:{
   flex:1,
   flexDirection:'column',
   justifyContent:'center'

  },
  topChart:{
    flex:5,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:50

  },

  topThird:{
   
   
  },
  topThirdtext:{
   textAlign:'center',
   fontSize:24
  },
  botChart:{
   height:windowHeight/3,
   backgroundColor:'#0E1B32',
   
   
  },
  botChartsView:{
   backgroundColor:'white',
   width:120,
   height:180,
   marginHorizontal:10,
   marginTop:40
   

  },
})
