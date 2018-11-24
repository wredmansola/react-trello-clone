import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

export const Label = ({ color, text, active, onClick, card, listKey }) => (
  <LabelWrapper
    className={`card-label-${color}`}
    onClick={event => onClick(listKey, card.key, { ...card, label: text })}
  >
    {text && <span>{text}</span>}
    {active && <Icon type="check" />}
  </LabelWrapper>
);

const LabelWrapper = styled.div`
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  min-width: 40px;
  padding: 0 12px;
  color: white;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
`;
