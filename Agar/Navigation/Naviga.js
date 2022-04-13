import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon, { Button } from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator, Header } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import Color from 'react-native-material-color';


import Kayit1 from '../Screen/Register/register1';
import Kayit2 from '../Screen/Register/register2';
import Kayit3 from '../Screen/Register/register3';
import login from '../Screen/Login/login';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/*const Stack1={
    Kayit1:{
        screen:Kayit1,
    },
    Kayit2:{
        screen:Kayit2,
    },
    Kayit3:{
        screen:Kayit3
    }

}*/

/*function StackKayitNavScreen (){
return(
  
<Stack.Navigator>

<Stack.Screen
      name="Kayit1"
      component={AppTabNavigator}
      
      options={({navigation, route}) => ({
        
        headerRight:()=> (
       
        <TouchableOpacity  
        
        onPress={() => navigation.navigate('Kayit2')} 
        >
       <Icon name='arrow-right' style={{fontSize:18,marginRight:10}}/>
        </TouchableOpacity>
  
          )
        
    })}
    />
    
    <Stack.Screen

      name="Kayit2"
          component={AppTabNavigator}
          
          options={({navigation, route}) => ({
        
            headerLeft: () => (
              <HeaderBackButton
                
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight:()=> (
       
                <TouchableOpacity  
                
                onPress={() => navigation.navigate('Kayit3')} 
                >
               <Icon name='arrow-right' style={{fontSize:18,marginRight:10}}/>
                </TouchableOpacity>
          
                  )
            })}

            />

<Stack.Screen
          name="Kayit3"
          component={AppTabNavigator}
          options={({navigation, route}) => ({
        
            headerLeft: (props) => (
              <HeaderBackButton
              
                onPress={() => navigation.goBack()}
              />
            )
           
            })}
          
        />
    
    
    
      
    


</Stack.Navigator>
);
}
*/
function StackKayit1NavScreen({navigation}){

  return(
  <Stack.Navigator>

    <Stack.Screen



      name="KAYIT"
      component={Kayit1}

      options={({ navigation, route, color }) => ({

        headerRight: () => (

          <TouchableOpacity

            onPress={() => navigation.navigate('Asama 2')}
          >
            <Icon name='arrow-right' style={{ fontSize: 18, marginRight: 10, color: 'white' }} />
          </TouchableOpacity>

        ),

        headerStyle: {
          backgroundColor: 'transparent',


        },
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25

        }
      })}
    />


  </Stack.Navigator>

);
    }


function StackKayit2NavScreen(){

  return(
  <Stack.Navigator>

    <Stack.Screen
      name="KAYIT"
      component={Kayit2}

      options={({ navigation, route }) => ({

        headerLeft: () => (
          <HeaderBackButton
            tintColor={'white'}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (

          <TouchableOpacity

            onPress={() => navigation.navigate('Asama 3')}
          >
            <Icon name='arrow-right' style={{ fontSize: 18, marginRight: 10, color: 'white' }} />
          </TouchableOpacity>

        ),
        headerTransparent: true,

        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25

        }
      })}
    />


  </Stack.Navigator>
)
    }



function StackKayit3NavScreen() {

  return(
  <Stack.Navigator>

    <Stack.Screen
      name="KAYIT"
      component={Kayit3}

      options={({ navigation, route }) => ({

        headerLeft: (props) => (
          <HeaderBackButton
            tintColor={'white'}
            onPress={() => navigation.navigate('Asama 2')}
          />
        ),
        headerTransparent: true,

        headerStyle: {
          backgroundColor: 'transparent',

        },
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25

        }

      })}

    />


  </Stack.Navigator>
)
    }





function AppTabNavigator() {

  return(

  <Tab.Navigator

    screenOptions={({ route }) => ({

      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Asama 1') {
          iconName = "walking"


        } else if (route.name === 'Asama 2') {
          iconName = "walking";
        }
        else if (route.name === 'Asama 3') {
          iconName = "door-closed";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },

    })}
    tabBarOptions={{
      activeTintColor: Color.RED[500],
      inactiveTintColor: 'white',

      style: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,

      }
    }}

  >
    <Tab.Screen name="Asama 1" component={StackKayit1NavScreen}
    />
    <Tab.Screen name="Asama 2" component={StackKayit2NavScreen} />
    <Tab.Screen name="Asama 3" component={StackKayit3NavScreen} />
  </Tab.Navigator>




  )
  };

 function NavStack ({navigation}) {

  return(
  
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,

    }}
  >

    <Stack.Screen
      name="Register"
      component={AppTabNavigator}

    />

    <Stack.Screen
      name="Login"
      component={login}


    />

  </Stack.Navigator>
  
)
  }

  export default function Naviga({navigation}){

    return(
    <NavStack/>
    )
  }










