import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../../components/CustomTabBar';

import Home from '../../assets/screens/home';
import Search from '../../assets/screens/Search';
import Appointments from '../../assets/screens/Appointments';
import Favorites from '../../assets/screens/Favorites';
import Profile from '../../assets/screens/Profile';


// Tipagem das rotas do Tab
export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Appointments: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Buscar' }} />
      <Tab.Screen name="Appointments" component={Appointments} options={{ title: 'Atendimentos' }}/>
      <Tab.Screen name="Favorites" component={Favorites} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
