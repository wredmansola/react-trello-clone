import styled from 'styled-components';

const Button = styled.div`
  transition: 0.1s ease;
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 3px;
  color: #fff;
  display: block;
  font-weight: 700;
  line-height: 32px;
  margin-right: 4px;
  min-width: 32px;
  padding: 0;
  text-decoration: none;
  text-align: center;
  &:hover {
    background: hsla(0, 0%, 100%, 0.2);
    color: #fff;
    cursor: pointer;
  }
  &:active {
    background: hsla(0, 0%, 100%, 0.1);
  }
  i {
    font-size: 1rem !important;
  }
`;

export default Button;
