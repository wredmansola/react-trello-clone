import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const StyledBoard = styled.div`
  position: relative;
  display: inline-block;
  padding: 4px;
  width: 30%;
  height: 80px;
  background-color: ${props => (props.color ? props.color : '#026aa7')};
  color: white;
  margin: 1%;
  border-radius: 4px;
`;

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
    console.log(favorite);
    return (
      <StyledBoard color={color}>
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
          <Icon type="star" />
        </Favorite>
      </StyledBoard>
    );
  }
}
