import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { UserContext } from '../../../src/contexts/UserContext';
import Api from '../../../Api';

import BarberLogo from '../../images/barber.svg';

// Se você tiver definido um tipo para as rotas (ex: RootStackParamList), substitua aqui
type RootStackParamList = {
  SignIn: undefined;
  MainTab: undefined;
};

export default function Preload() {
  const { dispatch: userDispatch } = useContext(UserContext);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem('token', res.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res?.data?.avatar || '',
            },
          });

          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTab' }],
          });
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
}
