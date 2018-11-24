import React from 'react';
import styled from 'styled-components';

export const Label = ({ color, title }) => (
  <LabelWrapper className={`card-label-${color}`}>
    {title && <span>{title}</span>}
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
`;
