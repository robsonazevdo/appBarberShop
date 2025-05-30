
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackIcon from '../../images/back.svg';
import { Container, 
         Scroller,
         BackButton,
          InputArea,
          LocationInput,
          ListArea,
          LocationBtnText,
          TextTitle,
          LoadingIcon
      

         } from './styles';
import Api from '../../../Api';

import BarberItem from '../../../components/BarberItem';

type RootStackParamList = {
  
  Barber: {
    id: number;
    avatar: string;
    name: string;
    stars: number;
    photos?: { url: string }[];
    services:[];
    testimonials:[];
    available: [];
  };
};

type Barber = {
  id: string;
  name: string;
  avatar: string;
  // outros campos que sua API retornar
};

type BarberScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Barber'>;
type BarberScreenRouteProp = RouteProp<RootStackParamList, 'Barber'>;


const Favorites = () => {

    const navigation = useNavigation<BarberScreenNavigationProp>();
    const route = useRoute<BarberScreenRouteProp>();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Barber[]>([]);
const [refreshing, setRefreshing] = useState<boolean>(false); // Tipando como boolean


    useEffect(() => {
    const getFavoritesInfo = async () => {
      setLoading(true);
      const json = await Api.getFavorites();
      
      if (json.error === '') {
        setList(json.data)
       
      } else {
        Alert.alert('Erro', json.error);
      }
      setLoading(false);
    };
    getFavoritesInfo();
  }, []);


  const onRefresh = async () => {
  setRefreshing(true);
  await getFavoritesInfo();
  setRefreshing(false);
};

const handleBackButton = () =>{
  navigation.goBack();
}


  return (
    <Container >
        <LocationBtnText>
            <BackButton onPress={handleBackButton}>
              <BackIcon width='44px' height='44px' fill='#ffffff'/>
          </BackButton>

      <TextTitle >Favoritos</TextTitle>
        </LocationBtnText>

          

        <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loading && <LoadingIcon size="large" color="#FFFFFF" />}
          <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
      
    </Container>
  );
};

export default Favorites;

function getFavoritesInfo() {
  throw new Error('Function not implemented.');
}

