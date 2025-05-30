// src/components/ui/SignInput.tsx

import React from 'react';
import {styled} from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
  IconSvg: React.FC<SvgProps>;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
} & TextInputProps;

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #83d6e3;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #268596;
  margin-left: 10px;
`;

const SignInput: React.FC<Props> = ({ IconSvg, placeholder, value, onChangeText, password, ...rest }) => {
  return (
    <InputArea>
      <IconSvg width={24} height={24} fill="#268596" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        {...rest}
      />
    </InputArea>
  );
};

export default SignInput;
