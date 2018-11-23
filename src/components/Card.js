import React, { Component } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Icon } from 'antd';
import Button from './Button';

const StyledCard = styled.div`
  position: relative;
  background: white;
  margin-bottom: 7px;
  border-radius: 3px;
  padding: 6px 10px 6px;
  box-shadow: 0px 1px 0px grey;
  &:hover {
    background: #efefef;
    cursor: pointer;
  }
`;

const Label = styled.div``;

const Title = styled.div``;

const Badges = styled.div``;

const Edit = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

// TODO: сделать нормальный компонент
const StyledButton = styled(Button)`
  color: gray;
  margin: 0;
  font-size: 10px;
  padding: 4px;
  line-height: inherit;
  min-width: auto;
  &:hover {
    background: ${darken(0.05, '#eee')};
    color: ${darken(0.05, 'gray')};
  }
`;

export default class Card extends Component {
  state = {
    edit: false
  };

  handleShowEditButton = () => {
    this.setState(() => ({ edit: true }));
  };

  handleHideEditButton = () => {
    this.setState(() => ({ edit: false }));
  };

  render() {
    const { title, tag, date, description } = this.props;
    const { edit } = this.state;
    return (
      <StyledCard
        onMouseEnter={this.handleShowEditButton}
        onMouseLeave={this.handleHideEditButton}
      >
        <Label />
        <Title>{title}</Title>
        <Badges />
        {edit && (
          <Edit>
            <StyledButton>
              <Icon type="edit" />
            </StyledButton>
          </Edit>
        )}
      </StyledCard>
    );
  }
}
