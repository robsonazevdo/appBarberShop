// src/components/Stars.tsx

import React from 'react';
import {styled} from 'styled-components/native';
import StarFull from '../assets/images/star.svg';
import StarHalf from '../assets/images/star_half.svg';
import StarEmpty from '../assets/images/star_empty.svg';

const StarArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarView = styled.View``;

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

type Props = {
  stars: number;
  showNumber?: boolean;
};

const Stars: React.FC<Props> = ({ stars, showNumber = false }) => {
  const s = [0, 0, 0, 0, 0];
  const floor = Math.floor(stars);
  const left = stars - floor;

  for (let i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0 && floor < 5) {
    s[floor] = 1;
  }

  return (
    <StarArea>
      {s.map((i, k) => (
        <StarView key={k}>
          {i === 0 && <StarEmpty width={18} height={18} fill="#FF9200" />}
          {i === 1 && <StarHalf width={18} height={18} fill="#FF9200" />}
          {i === 2 && <StarFull width={18} height={18} fill="#FF9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars.toFixed(1)}</StarText>}
    </StarArea>
  );
};

export default Stars;
