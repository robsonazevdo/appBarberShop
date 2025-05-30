
import { useNavigation, } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, Alert } from 'react-native';
import { styled } from 'styled-components/native';
import ExpandIcon from '../assets/images/expand.svg';
import NavNextIcon from '../assets/images/nav_next.svg';
import NavPrevIcon from '../assets/images/nav_prev.svg';
import Api from '../Api';



const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0 ,0 , 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83D6E3;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 15px;
  padding: 20px;
`;

const UserInfoName = styled.Text`
  color:#000000;
  font-size: 18px;
  font-weight: bold;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

 const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 20px;
  
`;

const ServiceInfo = styled.View`
   flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ServicePrice = styled.Text`
   font-size: 16px;
  font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   background-color:#268596;
   border-radius: 20px;
   height:60px;
`;

const FinishButtonText = styled.Text`
   font-size: 16px;
  font-weight: bold;
  color:#fff;
`;

const DateInfo = styled.View`
   flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
   flex: 1;
   justify-content: flex-end;
   align-items: flex-end;
`;

const DateTitleArea = styled.View`
   width: 140px;
   justify-content: center;
   align-items: center;
`;

const DateNextTitle = styled.TouchableOpacity`
    flex: 1;
   align-items: flex-start;
`;

const DateTitle = styled.Text`
   font-size: 15px;
   font-weight: bold;
   color: #000000;
`;
const DateList = styled.ScrollView`
    
`;
const DateItem = styled.TouchableOpacity`
    width:45px;
    justify-self:center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items:center;
    
`;

const DateItemWeekDay = styled.Text`
    font-size:14px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
     font-size:14px;
    font-weight: bold; 
`;
 
const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
     width:75px;
     height: 40px;
    justify-self:center;
    border-radius: 10px;
    align-items:center;
`;

const TimeItemText = styled.Text`
     font-size:16px;
    font-weight: bold; 
`;


type BarberModalProps = {
  navigate(arg0: string, arg1: { screen: string; params: { barber_id: any; service: any; selectedTime: string; }; }): unknown;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  user: any;
  service: any;
  active: any;
 
};

const months = [
  "Janeiro",
  "Feveiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const days = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab"
];



const BarberModel: React.FC<BarberModalProps> = ({
  showModal,
  setShowModal,
  user,
  service,
  
}) => {

  const navigation = useNavigation<BarberModalProps>();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [listdHours, setListHours] = useState([]);
  const [listDays, setListDays] = useState(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  



  

  useEffect (() => {

    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedHours(today.getHours());
    setSelectedDay(today.getDay());
  }, []);


  useEffect(() =>{

    if (selectedYear === 0 || selectedMonth === 0 || !user?.available) return;

    let daysInMouth = new Date(selectedYear, selectedMonth+1, 0).getDate();
    let newListDays = [];
  
    for (let i = 1; i <= daysInMouth; i++) {
  let d = new Date(Number(selectedYear), Number(selectedMonth), i);
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Zera hora do hoje
  d.setHours(0, 0, 0, 0); // Zera hora do dia testado

  const isFutureOrToday = d >= today;

  let year = d.getFullYear();
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let day = d.getDate().toString().padStart(2, '0');
  let selDate = `${year}-${month}-${day}`;

  const available = user?.available?.filter((slot: { date: string }) => slot.date === selDate) ?? [];

  newListDays.push({
    status: available.length > 0 && isFutureOrToday,
    weekDay: days[d.getDay()],
    Number: i
  });
}


    setListDays(newListDays);
    //setSelectedMonth()
    setSelectedDay(0);
    setSelectedHours(0);
    setListHours([]);
    // setListDays

  }, [selectedYear, selectedMonth, user.available])



   useEffect (() => {

    if (selectedYear === 0 || selectedMonth === 0 || !user?.available) return;
   
    if(user?.available && selectedDay > 0){
      let d = new Date(Number(selectedYear), Number(selectedMonth), Number(selectedDay));
      let year = d.getFullYear();
      let month = (d.getMonth() + 1).toString().padStart(2, '0');
      let day = d.getDate().toString().padStart(2, '0');
      let selDate = `${year}-${month}-${day}`;

      

      const available = user?.available?.filter((slot: { date: string; }) => slot.date === selDate) ?? [];
      
      if (available.length > 0) {
  let hours = available[0].hours;

  const today = new Date();
  const isToday = selectedYear === today.getFullYear() &&
                  selectedMonth === today.getMonth() &&
                  selectedDay === today.getDate();

  if (isToday) {
    const currentHour = today.getHours();
    hours = hours.filter((h: string) => parseInt(h) > currentHour);
  }

  setListHours(hours);
  setSelectedHours(0);
}


    }
    

  }, [selectedDay, selectedMonth, selectedYear, user])

   const selectedService =
  service !== null && user.services && user.services[service]
    ? user.services[service]
    : null;

    

  const handleCloseButton = () => {
    setShowModal(false);
  };

const handleFinishClick = async () => {
  const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
const timeStr = String(selectedHours).padStart(2, '0');

setBookedTimes(prev => [...prev, `${dateStr}_${timeStr}`]);
const selectedHourNumber = parseInt(selectedHours as unknown as string);

  if (
  user?.id &&
  selectedService?.name &&
  selectedYear > 0 &&
  selectedMonth >= 0 &&
  selectedDay > 0 &&
  !isNaN(selectedHourNumber) &&
  selectedHourNumber >= 8 && selectedHourNumber <= 18
   ) {
  const appointmentDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')} ${String(selectedHours).padStart(2, '0')}:00`;

  try {
    const res = await Api.createAppointment(user.id, selectedService.name, appointmentDate);

    if (!res.error) {
      setShowModal(false);
      setBookedTimes(prev => [...prev, `${dateStr}_${timeStr}`]);

      navigation.navigate('MainTab', {
        screen: 'Appointments',
        params: {
          barber_id: user.id,
          service: selectedService.name,
          selectedTime: appointmentDate,
        },
      });
    } else {
      Alert.alert('Erro', res.error);
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Erro ao agendar', 'Tente novamente mais tarde.');
  }
} else {
  Alert.alert('Preencha todos os campos!');
}

};


  const handleNextClick = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);

  };

  const handlePrevClick = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
   
  };


 



  return (
    <Modal transparent visible={showModal} animationType="slide">
    <ModalArea>
      <ModalBody>
        <CloseButton onPress={handleCloseButton }>
          <ExpandIcon width='40' height='40' fill="#000" />
        </CloseButton>

                  {selectedService !== null ? (
            <>
              <ModalItem>
                <UserInfo>
                  <UserAvatar source={{ uri: user.avatar }} />
                  <UserInfoName>{user.name}</UserInfoName>
                </UserInfo>
              </ModalItem>
              <ModalItem>
                <ServiceInfo>
                  <ServiceName>{selectedService.name}</ServiceName>
                  <ServicePrice>R$ {selectedService.price.toFixed(2)}</ServicePrice>
                </ServiceInfo>
              </ModalItem>
            </>
          ) : (
            <Text>Serviço não encontrado</Text>
          )}

          <ModalItem>

             <DateInfo>
                <DatePrevArea>
                    <NavPrevIcon width='24' height='24' fill="#000" onPress={handlePrevClick}/>
                </DatePrevArea>  

                <DateTitleArea>
                  <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                </DateTitleArea>

                <DateNextTitle>
                    <NavNextIcon width='24' height='24' fill="#000" onPress={handleNextClick }/>
                </DateNextTitle>

             </DateInfo>
             < DateList  horizontal={true} showsHorizontalScrollIndicator={false}>
                {listDays?.map((item, index) => (
                  <DateItem key={index} style={{opacity: item.status ? 1 : 0.5,
                                                backgroundColor: item.Number === selectedDay ? '#4EADBE' : '#FFFFFF' 
                  }} 
                            onPress={()=>item.status ? setSelectedDay(item.Number) : null}
                  >
                    <DateItemWeekDay
                        style={{color: item.Number === selectedDay ? '#ffffff' : '' }}
                    >{item.weekDay}</DateItemWeekDay>
                    <DateItemNumber
                        style={{color: item.Number === selectedDay ? '#ffffff' : '' }}
                    >{item.Number}</DateItemNumber>
                  </DateItem>
                ))}
              </ DateList>
          </ModalItem>

          
            {selectedDay > 0 && listdHours.length > 0 && 
                <ModalItem>
                  <TimeList  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listdHours
                        .filter((item: string) => !bookedTimes.includes(`${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}_${item}`))
                        .map((item, key) => (

                        <TimeItem
                          key={key}
                          onPress={() => setSelectedHours(item)}
                          style={{
                            backgroundColor: selectedHours === item ? '#4EADBE' : '#FFF',
                          }}
                        >
                          <TimeItemText
                            style={{
                              color: selectedHours === item ? '#FFF' : '#000',
                              fontWeight: item === selectedHours ? 'Bold' : 'Normal'
                            }}
                          >
                            {item}
                          </TimeItemText>
                        </TimeItem>

                    ))}
                  </TimeList>
                </ModalItem>
            }
          

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>

      </ModalBody>
    </ModalArea>
  </Modal>
);
  
};

export default BarberModel;
