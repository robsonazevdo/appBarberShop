
import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Stars from '../../../components/Stars';
import BarberModal from '../../../components/BarberModal';
import FavoriteIcon from '../../images/favorite.svg';
import FavoriteFullIcon from '../../images/favorite_full.svg';
import BackIcon from '../../images/back.svg';
import PrevButton from '../../images/nav_prev.svg';
import NextButton from '../../images/nav_next.svg';

import { Container, 
         Scroller,
         FakeSwiper,
         PageBody,
         UserInfoArea,
         ServiceArea,
         TestimonialArea,
         SwipeDot,
         SwipeDotActive,
         SwipeItem,
         SwipeImage,
         UserAvatar,
         UserInfo,
         UserInfoName,
         UserFavButton,
         BackButton,
         ServiceTitle,
         ServiceItem,
         ServiceInfo,
         ServiceName,
         ServicePrice,
         ServiceChooseButton,
         ServiceChooseBtnText,

         TestimonialItem,
         TestimonialInfo,
         TestimonialName,
         TestimonialBody,

         

         } from './styles';
import Api from '../../../Api';
import { LoadingIcon } from '../preload/styles';



type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SignIn: undefined;
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






type BarberScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Barber'>;
type BarberScreenRouteProp = RouteProp<RootStackParamList, 'Barber'>;

const Barber: React.FC = () => {
  const navigation = useNavigation<BarberScreenNavigationProp>();
  const route = useRoute<BarberScreenRouteProp>();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
    photos:route.params.photos,
    services:route.params.services,
    testimonials:route.params.testimonials,
    available:route.params.available
    
  });

  

 
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectService, setSelectService] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  
  const handleFavClick = async () =>{
      
      const favorite = await Api.setFavorite(userInfo.id);
      setFavorited(favorite.favorited);
      
      
  };


  const handleServiceChoose = (key: number | React.SetStateAction<null>) =>{
      setSelectService(key);
      setShowModal(true);
      
  };

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      const json = await Api.getBarber(userInfo.id);
      const favorite = await Api.getFavorited(userInfo.id);
      if (json.error === '') {
        setUserInfo(json.data);
        setFavorited(favorite.favorited);
       
      } else {
        Alert.alert('Erro', json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleBackButton = () =>{
  navigation.goBack();
}


  return (
    
    <Container>
      <Scroller>
        
        {userInfo.photos && userInfo.photos.length > 0 ?
          <Swiper
              style={{height:240}}
              dot={<SwipeDot />}   
              activeDot={<SwipeDotActive />}    
              paginationStyle={{top: 15, right: 15, bottom:null, left:null}}    
              autoplay={true}
          >
            {userInfo.photos.map((item, key) => {
              return (
                <SwipeItem key={key}>
                  <SwipeImage source={{ uri: item }} />
                </SwipeItem>
              );
            })}


          </Swiper>
          : <FakeSwiper></FakeSwiper>
        }
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{ uri: userInfo.avatar }} />
              <UserInfo>
                <UserInfoName>{userInfo.name}</UserInfoName>
                <Stars stars={userInfo.stars} showNumber={true} />
              </UserInfo>
              <UserFavButton onPress={handleFavClick}>
                {favorited ?  
                  <FavoriteFullIcon width='24' height='24' fill='#ff0000' />
                :
                <FavoriteIcon width='24' height='24' fill='#ff0000' />
                }
                
              </UserFavButton>
        </UserInfoArea>
          {loading &&
              <LoadingIcon size='large' color="#000000"/>
              }
          <ServiceArea>
              <ServiceTitle>Lista de Serviços</ServiceTitle>
              {userInfo.services && userInfo.services.length > 0 && userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                    <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                      <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                    </ServiceChooseButton>
                </ServiceItem>
              ))}

          </ServiceArea>
        
            {userInfo.testimonials && userInfo.testimonials.length > 0 && 
                <TestimonialArea>
                  <Swiper
                    style={{ height: 110 }}
                    showsPagination={false}
                    showsButtons={true}
                    prevButton={<PrevButton width='35' height='35' fill='#000000' />}
                    nextButton={<NextButton width='35' height='35' fill='#000000' />}
                >
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                  ))}
                </Swiper> 

                   
                </TestimonialArea>
              }

          
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width='44px' height='44px' fill='#999999'/>
      </BackButton>
      
      
      <BarberModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={userInfo}
        service={selectService} navigate={function (arg0: string, arg1: { screen: string; params: { barber_id: any; service: any; selectedTime: string; }; }): unknown {
          throw new Error('Function not implemented.');
        } } active={undefined}      />
    </Container>
  );
};

export default Barber;
