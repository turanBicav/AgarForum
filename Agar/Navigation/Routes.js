import { View, Text } from 'react-native';
import React,{useContext,useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider'
import StackNav from './StackNav';
import Naviga from './Naviga';
import Loading from '../utils/Loading';
import HomeNav from './HomeNav';
import analytics from '@react-native-firebase/analytics';



const Routes = () => {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const {user,setUser}=useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  function useronAuthStateChanged(user){

    setUser(user);
    if (isInitial)  setIsInitial(false);
    setIsLoading(false);
  }

  useEffect(() => {
    
    const subscriber = auth().onAuthStateChanged(useronAuthStateChanged);
    return subscriber;
  
    
  }, []);

  if (isLoading) {
      return <Loading/>;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
      >
 {user && user.emailVerified ? <HomeNav/>:<Naviga/>}
    </NavigationContainer>
  )
}

export default Routes