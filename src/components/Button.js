import styled from 'styled-components';
import { darken } from 'polished';

const Button = styled.div`
  transition: 0.1s ease;
  border-radius: 3px;
  color: #fff;
  display: block;
  font-weight: 700;
  line-height: 32px;
  margin-right: 4px;
  min-width: 32px;
  padding: 0 5px;
  text-decoration: none;
  text-align: center;
  &:hover {
    background: ${darken(0.05, '#026aa7')};
    color: #fff;
    cursor: pointer;
  }
  &:active {
    background: ;
  }
  i {
    font-size: 1rem !important;
  }
`;

export default Button;
