import React, { Component } from 'react';
import { db } from '../firebase';
import { Link, withRouter } from 'react-router-dom';
import {
  Menu,
  Modal,
  Dropdown,
  Icon,
  Button as AButton,
  Input,
  Select
} from 'antd';

import * as routes from '../constants/routes';
import SignOutButton from '../screens/SignOut';
import CreateBoardModal from './CreateBoardModal';

import styled from 'styled-components';
import Button from '../components/Button';
import {
  BoardForm,
  StyledSelect,
  StyledInput,
  Nav,
  NavItems,
  NavUser
} from './styled';

const InputGroup = Input.Group;
const Option = Select.Option;

const StyledLink = styled(Link)`
  display: inline-block !important;
`;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="user" theme="outlined" />
      <StyledLink to={routes.ACCOUNT}>Settings</StyledLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Icon type="logout" theme="outlined" />
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

class NavigationAuth extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = modalVisible => {
    this.setState({ modalVisible });
  };

  handleCreateBoard = board => {
    return db.doCreateBoard(board).then(response => {
      this.setState(
        {
          modalVisible: false
        },
        () => {
          this.props.history.push(`/b/${response.key}`);
        }
      );
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    let showCreateBoardButton = this.props.location.pathname === '/boards';

    return (
      <Nav>
        <NavItems>
          <Link to={routes.BOARDS}>
            <Button>
              <Icon type="home" />
            </Button>
          </Link>
        </NavItems>
        <NavUser>
          {showCreateBoardButton && (
            <Button onClick={() => this.setModalVisible(true)}>
              <Icon type="plus" />
            </Button>
          )}
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              <Icon type="setting" theme="outlined" />
            </Button>
          </Dropdown>
        </NavUser>

        <CreateBoardModal
          onCreateBoard={this.handleCreateBoard}
          onCloseModal={this.handleCloseModal}
          visible={this.state.modalVisible}
        />
      </Nav>
    );
  }
}

export default withRouter(NavigationAuth);
