import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute , RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoadingIcon } from '../preload/styles';

import Api from '../../../Api';

import {
  Container,
  AppointmentCard,
  LeftSide,
  RightSide,
  BarberName,
  ServiceText,
  PriceText,
  DateBadge,
  TimeBadge,
  BadgeText,
  ListArea,
  Avatar,
  Scroller,
  CancelButton,
  CancelButtonText
} from './styles';



type RootStackParamList = {
  Appointments: {
    service: string;
    selectedTime: string;
    barber_id: number;
    Barber: {
      id: number;
      avatar: string;
      name: string;
      stars: number;
      photos?: { url: string }[];
      services: [];
      testimonials: [];
      available: [];
    };
  };
};

type AppointmentsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
type AppointmentsScreenRouteProp = RouteProp<RootStackParamList, 'Appointments'>;

const Appointments = () => {
  const navigation = useNavigation<AppointmentsScreenNavigationProp>();
  const route = useRoute<AppointmentsScreenRouteProp>();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  const getAppointmentsInfo = async () => {
    setLoading(true);
    const json = await Api.getAppointments(); 
      
    if (json && Array.isArray(json.appointments)) {
      if (json.appointments.length === 0) {
        Alert.alert('Aviso', 'Você ainda não tem agendamentos.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainTab', params: { screen: 'Home' } }],
              });
            },
          },
        ]);
      } else {
        setAppointments(json.appointments);
      }
    } else {
      setAppointments([]);
      Alert.alert('Erro', json?.error || 'Erro ao carregar agendamentos');
    }

    setLoading(false);
  };

  getAppointmentsInfo();
}, [navigation]);

const handleCancel = (appointmentId: number) => {
  Alert.alert(
    'Cancelar Agendamento',
    'Deseja realmente cancelar este agendamento?',
    [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          const res = await Api.cancelAppointment(appointmentId);
          
          if (res.success) {
            
           navigation.reset({
                index: 0,
                routes: [{ name: 'MainTab', params: { screen: 'Appointments' } }],
              });
          } else {
            Alert.alert('Erro', res.error || 'Erro ao cancelar agendamento.');
          }
        }
      }
    ]
  );
};





const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleDateString('pt-BR');
};

const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const isPast = (datetime: string) => {
  const now = new Date();
  const appointmentDate = new Date(datetime);
  return appointmentDate < now;
};




  return (
        <Container>
          {loading &&
                        <LoadingIcon size='large' color="#000000"/>
                        }
          <Scroller>
            <ListArea>
              {appointments.length > 0 &&
                appointments.map((item, key) => (
                  <AppointmentCard key={key}
                    style={isPast(item.datetime) ? { opacity: 0.4 } : {}}
                  >
                    <CancelButton onPress={() => handleCancel(item.id)}>
                        <CancelButtonText >X</CancelButtonText>
                      </CancelButton>
                    <LeftSide>
                      <Avatar source={{ uri: item.barber_avatar || 'https://via.placeholder.com/50' }} />
                      <ServiceText>{item.service}</ServiceText>
                      <DateBadge style={{ marginTop: 5 }}>
                        <BadgeText>{formatDate(item.datetime)}</BadgeText>
                      </DateBadge>
                    </LeftSide>

                    <RightSide>
                       
                      <BarberName style={{ marginLeft: -77 }}>{item?.barber_name}</BarberName>
                      <PriceText style={{ marginTop: 10 }}>
                        R$ {parseFloat(item?.price).toFixed(2)}
                      </PriceText>
                      <TimeBadge style={{ marginTop: 10 }}>
                        <BadgeText>{formatTime(item.datetime)}</BadgeText>
                      </TimeBadge>
                    </RightSide>
                  </AppointmentCard>
                ))
              }
              
            </ListArea>
        </Scroller>
      </Container>

);

};

export default Appointments;
