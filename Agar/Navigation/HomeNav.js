import 'react-native-gesture-handler';
import  React,{useContext} from 'react';
import { View, Text,TouchableOpacity,Dimensions, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItemList,
  DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon, { Button } from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack'
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';


import Anasayfa from '../Screen/Home/Anasayfa';
import Kategori from '../Screen/Home/Kategori';
import Cevapsiz from '../Screen/Home/Cevapsiz';
import İlgili from '../Screen/Home/İlgili';
import OneCikan from '../Screen/Home/OneCikan';
import Yeni from '../Screen/Home/Yeni';
import ProfileNav from '../Navigation/ProfileNav';
import Post from '../Screen/Post/post';
import Post1 from '../Screen/Post/post1';
import postDetails from '../Screen/PostDetail/postDetails'
import OtherProfileNav from './OtherProfileNav'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
   
       <Stack.Navigator
            
             initialRouteName='HomeNav'
            screenOptions={{
             headerShown: false,
  
      }}
             >
             
             <Stack.Screen name="HomeNav" component={MyDrawer}
             
             />
            
             {/* <Stack.Screen
              name="ProfileNav"
               component={ProfileNav}
               /> */}
             {/* <Stack.Screen 
             name="Naviga" 
             component={Naviga}
             />*/}
             <Stack.Screen 
             name="OtherProfileNav" 
             component={OtherProfileNav}
             />
             <Stack.Screen 
              name="Post"
               component={Post}
               />
               <Stack.Screen 
              name="Post1"
               component={Post1}
               />
                <Stack.Screen 
               name="postDetails"
               component={postDetails}
               getId={({params})=>params.title}
               
               
               />
             </Stack.Navigator>
   
  );
}




function MyTabs({route,navigation}) {
  const tabBarOptions = {
   
       indicatorStyle: {
         bottom: 0,
         borderBottomColor: "#E02401",
         borderBottomWidth: 2,
       },
      
     
       
    };
  
    return (
      <Tab.Navigator
   tabBarOptions={
    tabBarOptions
   }
     
      
      initialRouteName="Anasayfa"
     screenOptions={{
      
          tabBarScrollEnabled:true,

          tabBarStyle:{
            backgroundColor:'#0E1B32',
           
            
          },
          tabBarLabelStyle:{
            color:'white',
           
          },
       
     }}

      >
        <Tab.Screen name="Anasayfa" component={Anasayfa} />
        <Tab.Screen name="Kategori" component={Kategori} />
        <Tab.Screen name="Cevapsiz" component={Cevapsiz} />
        <Tab.Screen name="İlgili" component={İlgili} />
        <Tab.Screen name="Yeni" component={Yeni}  initialParams={{ params: route.params }}/>
        <Tab.Screen name="OneCikan" component={OneCikan} />
      </Tab.Navigator>
    );
  }

  function CustomDrawerContent(props) {

    const {signOut} = useContext(AuthContext);
    return (

        <SafeAreaView style={{flex:1,height:windowHeight}}>
        <DrawerItemList {...props} />
        <DrawerItem label={''}
         style={{
          bottom:0,
          position:'absolute',
          right: 0,
          width:windowWidth/8,
         }}
        icon={()=>
          <IonIcon
          name='log-in-outline'
          color='red'
          size={30}
          />
        }
          onPress={()=>signOut()}
        />
        </SafeAreaView>
    );
  }

function MyDrawer({navigation},props) {
  return (
    <Drawer.Navigator 
    initialRouteName='MyTabs'
    drawerContent={props=><CustomDrawerContent {...props}
    />
  }
    
    
    screenOptions={({ navigation, route, color }) =>({
    headerTitleAlign:'center',
    headerTintColor:'white',
    drawerContentContainerStyle:{
      flex:1,
      backgroundColor:'red'
        },



    headerTitleStyle:{
     color:'white'
    },
    headerStyle:{
      backgroundColor:'#0E1B32',
      borderBottomColor:'#0E1B32',
      borderBottomWidth:3,
      shadowColor: 'transparent' //bunu diğer yerde de kullan
    },
  
    
    })}

    >
      <Drawer.Screen name="MyTabs" component={MyTabs} />
      <Drawer.Screen name="ProfileNav" component={ProfileNav} options={{headerShown:false}} />
    </Drawer.Navigator>
  );
}

export default function HomeNav({navigation}) {
  return (
    
      <Home/>
   
  );
}