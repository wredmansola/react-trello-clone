import styled from 'styled-components';
import { Select, Input } from 'antd';

const BoardTypes = styled.div`
  margin-bottom: 10px;
`;

const BoardTypeTitle = styled.h4`
  i {
    margin-right: 5px;
    color: gray;
  }
  margin-left: 5px;
  margin-bottom: 0px;
`;

const Boards = styled.div`
  max-width: 800px;
  margin: 0 auto;
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

const BoardsContainer = styled.div`
  display: flex;
`;

export {
  BoardForm,
  StyledSelect,
  StyledInput,
  BoardTypes,
  BoardTypeTitle,
  Boards,
  BoardsContainer
};
