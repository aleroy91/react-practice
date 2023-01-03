import React, { useState } from "react";
import {
  ExitButton,
  ActionButton,
  SubmitButton,
  BasicContainer,
  HorizontalContainer,
  VerticalContainer,
  ColumnContainer,
} from "./styled-components";
import styled from "styled-components";

const ImageContainer = styled(BasicContainer)`
  height: 250px;
  width: 250px;
`;

const Image = styled.img`
  max-height: 250px;
  max-width: 250px;
`;

const TextArea = styled.textarea`
  border: 1px white solid;
  border-radius: 5px;
  font-family: "Roboto-Regular", sans-serif;

  :hover {
    border: 1px lightgrey solid;
  }
`;

const TextContainer = styled(ColumnContainer)`
  text-align: left;
`;

const RecordCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  border: solid 1px lightgrey;
  width: fit-content;
  margin: 10px;

  :hover {
    border: solid 1px #1c849b;
  }
`;

export const RecordCardsArray = (props) => {
  const {
    selectedRecordsArray,
    unfilteredRecordData,
    updateRecordInfo,
    displayRecordCard,
  } = { ...props };

  const recordCardsFromArray = selectedRecordsArray.map(
    (selectedrecordId, index) => (
      <RecordCard
        key={index}
        hide={false}
        recordIndex={selectedrecordId}
        record={unfilteredRecordData[selectedrecordId]}
        updateRecordInfo={updateRecordInfo}
        displayRecordCard={displayRecordCard}
      />
    )
  );

  return <HorizontalContainer>{recordCardsFromArray}</HorizontalContainer>;
};

export const RecordCard = (props) => {
  const { displayRecordCard, recordIndex, record, updateRecordInfo } = {
    ...props,
  };
  const {
    name,
    number,
    position,
    price,
    points,
    expected_points,
    photo,
    gif,
    notes,
  } = { ...record };
  const [hoverState, setHoverState] = useState(false);

  const toggleGif = () => setHoverState(() => (hoverState ? false : true));
  const handleNoteschange = (updatedNotes) =>
    updateRecordInfo(recordIndex, updatedNotes);

  return (
    <BasicContainer>
      <RecordCardDiv>
        <ExitButton onClick={() => displayRecordCard(recordIndex)}>
          <span className="material-icons">close</span>
        </ExitButton>
        <VerticalContainer key={number}>
          <h1>{name}</h1>
          <Avatar
            onMouseEnter={toggleGif}
            onMouseLeave={toggleGif}
            isUserHovering={hoverState}
            photo={photo}
            gif={gif}
            alt={name}
          />
          <h3>Statistics</h3>
          <TextContainer>
            <h4>Position: {position}</h4>
            <h4>Price: £{price}m</h4>
            <h4>Points: {points}</h4>
            <h4>Expected Points: {expected_points}</h4>
          </TextContainer>
          <Notes notesText={notes} onNotesChange={handleNoteschange} />
        </VerticalContainer>
      </RecordCardDiv>
    </BasicContainer>
  );
};

const Avatar = (props) => {
  return (
    <ImageContainer
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.isUserHovering ? (
        <Image src={props.gif} alt={props.name} />
      ) : (
        <Image src={props.photo} alt={props.name} />
      )}
    </ImageContainer>
  );
};

const Notes = ({ notesText, onNotesChange }) => {
  const [notes, setNotes] = useState(notesText);
  const [displayNotesHideTextarea, setDisplayNotesHideTextarea] =
    useState(true);
  const [showSaveNotesButton, setShowSaveNotesButton] = useState(false);

  return (
    <VerticalContainer>
      {notes && displayNotesHideTextarea && (
        <TextContainer as="p">{notes}</TextContainer>
      )}
      {!displayNotesHideTextarea && (
        <TextArea
          placeholder="Add Notes..."
          autoFocus
          value={notes}
          onChange={(event) => {
            setShowSaveNotesButton(true);
            setNotes(event.target.value);
          }}
        />
      )}
      <HorizontalContainer>
        {displayNotesHideTextarea && (
          <ActionButton onClick={() => setDisplayNotesHideTextarea(false)}>
            {notes ? "Edit" : "Add"} Notes
          </ActionButton>
        )}
        {showSaveNotesButton && (
          <SubmitButton
            onClick={() => {
              onNotesChange(notes);
              setDisplayNotesHideTextarea(true);
              setShowSaveNotesButton(false);
            }}
          >
            Save Changes
          </SubmitButton>
        )}
      </HorizontalContainer>
    </VerticalContainer>
  );
};
