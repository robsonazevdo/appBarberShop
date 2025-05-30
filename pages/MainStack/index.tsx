import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Preload  from '../../assets/screens/preload';
import SignIn from '../../assets/screens/SignIn';
import SignUp from '../../assets/screens/SignUp';
import MainTab from '../MainTab';
import Barber from '../../assets/screens/Barber';
import Appointments from '@/assets/screens/Appointments';
// import SignOut from '../../assets/screens/SignOut';   

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Preload" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Barber" component={Barber} />
      <Stack.Screen name="Appointments" component={Appointments} />
      {/* <Stack.Screen name="SignOut" component={SignOut} /> */}
    </Stack.Navigator>
  );
}
