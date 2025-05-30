// BarberAvatar.tsx
import React from 'react';
import { styled } from 'styled-components/native';

const AvatarImage = styled.Image<{ index: number }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: #fff;
  position: absolute;
  left: ${({ index }) => index * 25}px;
  z-index: ${({ index }) => 100 - index};
`;

type BarberAvatarProps = {
  avatar: string;
  index: number;
};

const BarberAvatar: React.FC<BarberAvatarProps> = ({ avatar, index }) => {
  return <AvatarImage source={{ uri: avatar }} index={index} />;
};

export default BarberAvatar;
