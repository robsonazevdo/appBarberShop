import React from 'react';
import {styled} from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ffffff;
`;

export const ProfileArea = styled.View`
    background-color: #83D6E3;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

export const UserAvatar = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  border-width: 6px;
  border-color:#63C2D1;
  
`;


export const PageBody = styled.View`
    background-color: #ffffff;
    border-top-left-radius:50px;
    margin-top:-50px;
    min-height:400px;
`;

export const AvatarArea = styled.View`
 flex-direction: row;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center;
  gap: 10px;
  position: relative;
  margin-top: 50px;
  margin-bottom: 60px;
  margin-right: auto;
  margin-left: 160px;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: #4eadbe;
  padding: 12px 24px;
  border-radius: 20px;
  align-items: center;
  margin-top: 20px;
  width:80%;
  margin-left: auto;
  margin-right: auto;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  
`;

