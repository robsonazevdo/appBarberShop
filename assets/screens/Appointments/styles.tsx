import React from 'react';
import {styled} from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;


export const ListArea = styled.View`
  margin-top: 40px;
  margin-left: 12px;
  margin-right: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: column;  
  gap: 15px; 
   
`;


export const AppointmentItem = styled.View`
    background-color: #fff;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  height: 160px;
  
`;

export const AppointmentText = styled.Text`
    font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`;

export const AppointmentCard = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const LeftSide = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;



export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: #ccc;
  margin-top: -5px;
  margin-left: -77px;
`;

export const RightSide = styled.View`
  flex: 2;
  
`;

export const BarberName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;


export const ServiceText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  align-items: left;
`;

export const PriceText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;


export const DateBadge = styled.View`
  background-color: #00bcd4;
  padding: 5px 10px;
  border-radius: 8px;
  margin-right: 10px;
  align-items:center;
`;

export const TimeBadge = styled.View`
  background-color: #0288d1;
  padding: 5px 10px;
  border-radius: 8px;
  width:100px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-weight: bold;
`;


export const CancelButton = styled.TouchableOpacity`
 position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e53935;
  padding: 6px 10px;
  border-radius: 12px;
  z-index: 10;
`;

export const CancelButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size:9px;
`;
