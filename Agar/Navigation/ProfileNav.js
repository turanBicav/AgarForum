import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon, { Button } from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack'

import profile from '../Screen/Profile/profile'
import level from '../Screen/Profile/level'
import category from '../Screen/Profile/followCategory'
import followProfile from '../Screen/Profile/follow/followProfile'
import followerProfile from '../Screen/Profile/follow/followerProfile'
import HomeNav from '../Navigation/HomeNav';




const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
   
      <Stack.Navigator initialRouteName='ProfileScreen'
      screenOptions={{
        headerShown: false,
  
      }}
      
      >
        <Stack.Screen name="HomeNav" component={HomeNav} />
        <Stack.Screen name="ProfileScreen" component={MyDrawer} />
      </Stack.Navigator>
   
  );
}


function MyTabs() {
    return (
      <Tab.Navigator
      
      initialRouteName="followProfile"
      
      >
        <Tab.Screen name="followProfile" component={followProfile} />
        <Tab.Screen name="followerProfile" component={followerProfile} />
      </Tab.Navigator>
    );
  }


function MyDrawer() {
  return (
    <Drawer.Navigator 

    initialRouteName="Profile"
    screenOptions={({ navigation, route, color }) =>({
    headerTitleAlign:'center',
    headerTintColor:'white',

    headerRight: () => (

      <TouchableOpacity

        onPress={() => navigation.navigate('HomeNav')}
      >
        <Icon name='home' style={{ fontSize: 20, marginRight: 15, color: 'white' }} />
      </TouchableOpacity>

    ),


    headerTitleStyle:{
     color:'white'
    },
    headerStyle:{
      backgroundColor:'#0E1B32',
      borderBottomColor:'#0E1B32',
      borderBottomWidth:3,
      shadowColor: 'transparent'
    },
    
    })}

    >
      <Drawer.Screen name="Profile" component={profile} />
      <Drawer.Screen name="Level" component={level} />
      <Drawer.Screen name="Category" component={category} />
      <Drawer.Screen name="FollowProfile" component={MyTabs} />
    </Drawer.Navigator>
  );
}

export default function ProfileNav() {
  return (
    
      <Home/>
    
  );
}