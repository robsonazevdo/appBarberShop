
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackIcon from '../../images/back.svg';
import { debounce } from 'lodash'; 

import { Container, 
         Scroller,
         BackButton,
          InputArea,
          LocationInput,
          ListArea
      

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




const Search = () => {

  const navigation = useNavigation<BarberScreenNavigationProp>();
  const route = useRoute<BarberScreenRouteProp>();

  
  
    const [loading, setLoading] = useState(false);
    const [nameBarber, setNameBarber] = useState('');
    const [list, setList] = useState<Barber[]>([]);


      useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      const json = await Api.getAllBarbers();
      if (json.error === '') {
        setList(json.data)
       
      } else {
        Alert.alert('Erro', json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const searchBarbers = async (text: string) => {
    if (text.length === 0) {
      const json = await Api.getAllBarbers();
      if (json.error === '') setList(json.data);
      return;
    }

    try {
      const res = await Api.getBarbersName(text);
      if (!res.error) {
        setList(res.data);
      }
    } catch (err) {
      console.log("Erro na busca:", err);
    }
  };

  // Debounced version da função
  const debouncedSearch = useCallback(debounce(searchBarbers, 500), []);

  const handleInputChange = (text: string) => {
    setNameBarber(text);
    debouncedSearch(text); // Chamada com debounce
  };

  const handleBackButton = () => {
    navigation.goBack();
  };


  return (
    <Container >
        
          <BackButton onPress={handleBackButton}>
              <BackIcon width='44px' height='44px' fill='#ffffff'/>
          </BackButton>

          <InputArea>
            <LocationInput
                placeholder="Digite o Nome do Barbeiro"
                placeholderTextColor="#ffffff"
                value={nameBarber}
                onChangeText={handleInputChange}
              />

        </InputArea>
       
      
        
      <Scroller>
          <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Search;


