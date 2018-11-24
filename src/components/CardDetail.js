import React from 'react';
import styled from 'styled-components';

export const CardDetail = props => {
  return (
    <CardDetailWrapper>
      <CardDetailHead>
        <CardDetailIcon>{props.icon}</CardDetailIcon>
        <CardDetailTitle>{props.title}</CardDetailTitle>
      </CardDetailHead>
      <CardDetailContent>{props.content}</CardDetailContent>
    </CardDetailWrapper>
  );
};

const CardDetailWrapper = styled.div`
  width: 100%;
`;

const CardDetailHead = styled.div`
  display: flex;
`;

const CardDetailIcon = styled.div`
  width: 7%;
`;

const CardDetailTitle = styled.div``;

const CardDetailContent = styled.div``;
