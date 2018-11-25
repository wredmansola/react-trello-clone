import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Button from './Button';

import { Icon } from 'antd';

const StyledBoardTitle = styled.div`
  margin-top: -20px;
  background-color: ${props => props.color};
  display: flex;
  position: relative;
  padding: 4px 8px 8px;
`;

const Title = styled.h3``;

const Favorite = styled.div``;

const ShowMenuButton = styled.div`
  color: white;
  position: absolute;
  right: 0;
  text-decoration: underline;
  div {
    font-weight: normal;
  }
`;

const StyledIcon = styled(Icon)`
  &.active {
    color: #f2d600;
  }
`;

const getColor = color => {
  if (color === 'Blue') {
    return '#026aa7';
  } else {
    return color;
  }
};

const MenuButtonText = styled.span`
  padding-left: 5px;
`;

const BoardTitle = ({ title, favorite, onAddToFavorite, color }) => (
  <StyledBoardTitle color={getColor(color)}>
    <Title>
      <Button>{title}</Button>
    </Title>
    <Favorite>
      <Button>
        <StyledIcon type="star" className={favorite && 'active'} />
      </Button>
    </Favorite>
    {/* <ShowMenuButton>
      <Button>
        <Icon type="ellipsis" />
        <MenuButtonText>Show menu</MenuButtonText>
      </Button>
    </ShowMenuButton> */}
  </StyledBoardTitle>
);

export default BoardTitle;
