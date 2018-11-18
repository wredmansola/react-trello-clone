import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const StyledBoard = styled.div`
  position: relative;
  display: inline-block;
  padding: 4px;
  width: 20%;
  height: 80px;
  background-color: ${props => (props.color ? props.color : '#026aa7')};
  color: white;
  margin: 1%;
  border-radius: 4px;
  @media only screen and (max-width: 400px) and (min-width: 320px) {
    width: 98%;
  }
  @media only screen and (max-width: 720px) and (min-width: 400px) {
    width: 48%;
  }
  @media only screen and (max-width: 1024px) and (min-width: 720px) {
    width: 30%;
  }
`;

const getColor = color => {
  if (color === 'Blue') {
    return '#026aa7';
  } else {
    return color;
  }
};

const Title = styled.div`
  font-weight: bold;
`;

const Favorite = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  transition: all 0.1s;
  color: ${props => (props.favorite ? '#f2d600' : 'white')};
  display: ${props => (props.favorite ? 'block' : 'none')};
`;

export default class Board extends Component {
  render() {
    const { title, favorite, color } = this.props;
    return (
      <StyledBoard color={getColor(color)}>
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
          <Icon type="star" />
        </Favorite>
      </StyledBoard>
    );
  }
}
