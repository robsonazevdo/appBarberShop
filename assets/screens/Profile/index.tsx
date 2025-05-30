/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, RefreshControl, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackIcon from '../../images/back.svg';
import { 
  Container,
        ProfileArea,
        UserAvatar,
        PageBody,
        AvatarArea,
        CustomButton,
        ButtonText
      

         } from './styles';
import Api from '../../../Api';


import { BackButton } from '../Search/styles';
import {UserContext} from '@/src/contexts/UserContext';
import BarberAvatar from '@/components/BarberAvatar';




type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SignIn: undefined;
  Barber: {
    id: string;
    avatar?: { url: string }[];
    name: string;
    stars: number;
    photos?: { url: string }[];
    services:[];
    testimonials:[];
    available: [];
  };
};


type BarberScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Barber'>;
type BarberScreenRouteProp = RouteProp<RootStackParamList, 'Barber'>;

type Barber = {
  id: string;
  name: string;
  avatar: string;
  // outros campos que sua API retornar
};

const Profile: React.FC = () => {

 const navigation = useNavigation<BarberScreenNavigationProp>();
 const route = useRoute<BarberScreenRouteProp>();
 const { state: user } = useContext(UserContext);

   
 
  
   const [loading, setLoading] = useState(false);
   const [list, setList] = useState<Barber[]>([]);
 


  useEffect(() => {
  const getBarberInfo = async () => {
    setLoading(true);

    try {
      const json = await Api.getAllBarbers();

      if (json.error === '') {
        

        const barber = json.data;

        if (barber) {
          setList(barber);
        } else {
          Alert.alert('Erro', 'Barbeiro não encontrado.');
        }
      } else {
        Alert.alert('Erro', json.error);
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro inesperado');
    }

    setLoading(false);
  };

  getBarberInfo();
}, []);


  


  const handleLogoutClick = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{ name: 'SignIn' }],
    });
    
  }

  const handleBackButton = () =>{
  navigation.goBack();
  }

  return (
      <Container>

        <ProfileArea >
          <BackButton onPress={handleBackButton}>
              <BackIcon width='44px' height='44px' fill='#ffffff'/>
          </BackButton>
        
      </ProfileArea>
      
       <PageBody >
          
         <UserAvatar source={{ uri: user.avatar }}/>

          <AvatarArea>
            {list.map((item, index) => (
              <BarberAvatar key={item.id} avatar={item.avatar} index={index} />
            ))}
          </AvatarArea>
        
          <CustomButton onPress={handleLogoutClick}>
            <ButtonText>Sair</ButtonText>
          </CustomButton>

       </PageBody>
       
       

      </Container>
      
    
  );
};

export default Profile;

