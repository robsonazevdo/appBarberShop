import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';



import Api from '../../../Api';


import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from './styles';

import BarberItem from '../../../components/BarberItem';

import SearchIcon from '../../../assets/images/search.svg';
import MyLocationIcon from '../../../assets/images/my_location.svg';

// Defina o tipo para um "Barber"
type Barber = {
  id: string;
  name: string;
  avatar: string;
  // outros campos que sua API retornar
};

type Coords = {
  latitude: number;
  longitude: number;
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [locationText, setLocationText] = useState<string>(''); // Tipando como string
  const [coords, setCoords] = useState<Coords | null>(null); // Tipando como Coords ou null
  const [loading, setLoading] = useState<boolean>(false); // Tipando como boolean
  const [list, setList] = useState<Barber[]>([]); // Tipando como um array de Barber
  const [refreshing, setRefreshing] = useState<boolean>(false); // Tipando como boolean

  // Função para obter a localização atual do usuário
  const handleLocationFinder = async () => {
    setCoords(null); // Limpa as coordenadas
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso à localização');
      return;
    }

    setLoading(true);
    setLocationText('');
    setList([]);

    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
    getBarbers(); // Chama para obter os barbeiros com a nova localização
  };

  // Função para obter os barbeiros próximos com base na localização
const getBarbers = async () => {
  setLoading(true);
  setList([]);

  let lat = coords?.latitude || null;
  let lng = coords?.longitude || null;

  let res = await Api.getBarbers(lat, lng, locationText);

  if (res.error === '') {
    if (res.loc) {
      setLocationText(res.loc); // atualiza o texto com o nome da localização retornada
    }
    setList(res.data);
  } else {
    Alert.alert('Erro', `Erro: ${res.error}`);
  }

  setLoading(false);
};


  useEffect(() => {
    getBarbers(); // Chama ao carregar a tela
  }, []);

const onRefresh = async () => {
  setRefreshing(true);
  await getBarbers();
  setRefreshing(false);
};


  const handleLocationSearch = () => {
    setCoords(null); 
    getBarbers(); 
  };

  return (
    <Container>
      <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFFFFF"
            value={locationText}
            onChangeText={(t) => setLocationText(t)}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>
        </LocationArea>

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


export default Home;