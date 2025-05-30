import React, { useContext } from 'react';
import {styled} from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { UserContext } from '../src/contexts/UserContext';

import HomeIcon from '../assets/images/home.svg';
import SearchIcon from '../assets/images/search.svg';
import TodayIcon from '../assets/images/today.svg';
import FavoriteIcon from '../assets/images/favorite.svg';
import AccountIcon from '../assets/images/account.svg';

// Styled components
const TabArea = styled.View`
  height: 60px;
  background-color: #4eADBE;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #4eADBE;
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

// TSX Component
const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { state: user } = useContext(UserContext);

  const goTo = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <TodayIcon width="32" height="32" fill="#4EADBE" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar !== '' ? (
          <AvatarIcon source={{ uri: user.avatar }} />
        ) : (
          <AccountIcon
            style={{ opacity: state.index === 4 ? 1 : 0.5 }}
            width="24"
            height="24"
            fill="#FFFFFF"
          />
        )}
      </TabItem>
    </TabArea>
  );
};

export default CustomTabBar;
