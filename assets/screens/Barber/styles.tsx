import React from 'react';
import {styled} from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ffffff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;
 
export const SwipeDot = styled.View`
    width:10px;
    height:10px;
    background-color: #ffffff;
    border-radius:5px;
    margin:3px;
`;

export const SwipeDotActive = styled.View`
      width:10px;
    height:10px;
    background-color: #000000;
    border-radius:5px;
    margin:3px;
`;
        
export const SwipeItem = styled.View`
    flex: 1;
    background-color: #63C2D1;
`;

export const SwipeImage = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 240px;
`;


export const FakeSwiper = styled.View`
    height: 140px;
    background-color: #63C2D1;
`;


export const PageBody = styled.View`
    background-color: #ffffff;
    border-top-left-radius:50px;
    margin-top:-50px;
    min-height:400px;
`;


export const UserInfoArea = styled.View`
   flex-direction: row;
   margin-top:-30px;
`;


export const TestimonialArea = styled.View`
    margin-top: 30px;
    margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
    background-color: #268596;
    padding: 15px;
    border-radius: 10px;
    height: 110px;
    justify-content: center;
    margin-left: 50px;
    margin-right: 50px;
`;

export const TestimonialInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
`;


export const TestimonialBody = styled.Text`
    font-size: 13px;
    color: #ffffff;
`;





export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color:#ffffff;
  
`;

export const UserInfo = styled.View`
    flex: 1;
  justify-content: flex-end;
  margin-left: 20px;
`;

export const UserInfoName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
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
`;



export const ServiceArea = styled.View`
    margin-top: 30px;
`;

export const ServiceTitle = styled.Text`
      font-size: 16px;
    font-weight: bold;
    color: #268596;
    margin-bottom: 20px;
    margin-left: 30px;
`;

export const ServiceItem = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 20px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #268596;
`;


export const ServicePrice = styled.Text`
    font-size: 16px;
    color: #268596;
`;


export const ServiceChooseButton = styled.TouchableOpacity`
    background-color: #4EADBE;
    border-radius: 10px;
    padding: 10px 15px;
`;


export const ServiceChooseBtnText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;


