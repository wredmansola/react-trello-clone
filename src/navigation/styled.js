import { Select, Input } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #026aa7;
  padding: 4px;
  margin-bottom: 20px;
`;

const NavItems = styled.div`
  display: inline-block;
  margin-right: 10px;
  a {
    display: inline-block;
  }
`;

const NavUser = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  div {
    display: inline-block;
  }
`;

const BoardForm = styled.form`
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 40% !important;
`;

const StyledInput = styled(Input)`
  width: 60% !important;
`;

export { BoardForm, StyledSelect, StyledInput, Nav, NavItems, NavUser };
