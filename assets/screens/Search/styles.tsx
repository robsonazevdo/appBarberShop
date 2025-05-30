import React from 'react';
import {styled} from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;
 
export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color:#ffffff;
    border: 2px solid #999999;
    border-radius:20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left:20px;
    margin-right:20px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    margin-top: 33px;
`;




export const InputArea = styled.View`
  background-color: #4EADBE;
  height: 50px;
  width: 85%;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  margin-top: 30px;
  align-self: center;
  margin-left: 15px;
`;


export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #FFFFFF;
  
`;

export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left:20px;
    margin-right:20px;
`;