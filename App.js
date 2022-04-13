import { View, Text } from 'react-native'
import React from 'react';
import {AuthProvider} from './Agar/Navigation/AuthProvider';
import Routes from './Agar/Navigation/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App
