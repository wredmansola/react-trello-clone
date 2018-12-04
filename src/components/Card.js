import React, { Component } from "react";
import styled from "styled-components";
import { darken } from "polished";
import { Icon, Input } from "antd";
import { GrayButton } from "./Button";
import { Label } from "./Label";
import { LABELS } from "../constants";
import { find } from "lodash";

export default class Card extends Component {
  state = {
    showEditIcons: false,
    editMode: false,
    title: ""
  };

  handleShowEditButton = () => {
    this.setState(() => ({ showEditIcons: true }));
  };

  handleHideEditButton = () => {
    this.setState(() => ({ showEditIcons: false }));
  };

  handleEnableEdit = () => {
    const { title } = this.props.card;
    this.setState(() => ({ editMode: true, title }));
  };

  handleDisableEdit = () => {
    this.setState(() => ({ editMode: false }));
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmitForm = (event, callback, listKey, cardKey, title) => {
    event.preventDefault();

    callback(listKey, cardKey, { title }).then(() =>
      this.setState(() => ({
        editMode: false
      }))
    );
  };

  handleDeleteCard = (callback, listKey, cardKey) => {
    callback(listKey, cardKey);
  };

  render() {
    const { showModal, onEditCard, onDeleteCard, card, listKey } = this.props;
    const { showEditIcons, editMode, title } = this.state;
    return (
      <StyledCard
        onMouseEnter={this.handleShowEditButton}
        onMouseLeave={this.handleHideEditButton}
        onBlur={this.handleDisableEdit}
        editMode={editMode}
      >
        <LabelWrapper>
          {card.label && (
            <Label
              color={getColor(LABELS, card.label)}
              text={card.label}
              small={true}
            />
          )}
        </LabelWrapper>
        {editMode ? (
          <form
            onSubmit={event =>
              this.handleSubmitForm(event, onEditCard, listKey, card.key, title)
            }
          >
            <TitleInput
              value={this.state.title}
              onChange={event => this.handleTitleChange(event)}
              autoFocus
            />
          </form>
        ) : (
          <React.Fragment>
            {showEditIcons && (
              <Edit>
                <GrayButton onClick={this.handleEnableEdit}>
                  <Icon type="edit" />
                </GrayButton>
                <GrayButton
                  onClick={() =>
                    this.handleDeleteCard(onDeleteCard, listKey, card.key)
                  }
                >
                  <Icon type="delete" />
                </GrayButton>
              </Edit>
            )}
            <Title onClick={showModal}>{card.title}</Title>
          </React.Fragment>
        )}
        <Badges>{card.description && <Icon type="align-left" />}</Badges>
      </StyledCard>
    );
  }
}

function getColor(labels, text) {
  const label = find(labels, label => label.text === text);
  return label.color;
}

const StyledCard = styled.div`
  position: relative;
  background: white;
  margin-bottom: 7px;
  border-radius: 3px;
  padding: 6px 10px 6px;
  box-shadow: 0px 1px 0px grey;
  &:hover {
    background: ${props => (props.editMode ? "#fff" : "#efefef")};
    cursor: pointer;
  }
`;

const TitleInput = styled(Input)`
  border: none !important;
  outline: none !important;
  height: 20px !important;
  padding-left: 0 !important;
  &:focus {
    box-shadow: none !important;
  }
`;

const LabelWrapper = styled.div``;

const Title = styled.div``;

const Badges = styled.div``;

const Edit = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  > div {
    display: inline-block;
  }
`;
