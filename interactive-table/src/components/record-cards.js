import React, { useState } from "react";
import {
  ExitButton,
  ActionButton,
  SubmitButton,
  BasicContainer,
} from "./styled-components";
import styled from "styled-components";

const TextArea = styled.textarea`
  border: 1px white solid;
  border-radius: 5px;
  font-family: "Roboto-Regular", sans-serif;

  :hover {
    border: 1px lightgrey solid;
  }
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

  return <div className="horizontal-container">{recordCardsFromArray}</div>;
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
        <div key={number} className="vertical-container">
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
          <div className="text-container">
            <h4>Position: {position}</h4>
            <h4>Price: £{price}m</h4>
            <h4>Points: {points}</h4>
            <h4>Expected Points: {expected_points}</h4>
          </div>
          <Notes notesText={notes} onNotesChange={handleNoteschange} />
        </div>
      </RecordCardDiv>
    </BasicContainer>
  );
};

const Avatar = (props) => {
  return (
    <div
      className="image-container"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.isUserHovering ? (
        <img
          className="image-container__image"
          src={props.gif}
          alt={props.name}
        />
      ) : (
        <img
          className="image-container__image"
          src={props.photo}
          alt={props.name}
        />
      )}
    </div>
  );
};

const Notes = ({ notesText, onNotesChange }) => {
  const [notes, setNotes] = useState(notesText);
  const [displayNotesHideTextarea, setDisplayNotesHideTextarea] =
    useState(true);
  const [showSaveNotesButton, setShowSaveNotesButton] = useState(false);

  return (
    <div className="vertical-container">
      {notes && displayNotesHideTextarea && (
        <p className="text-container">{notes}</p>
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
      <div className="horizontal-container">
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
      </div>
    </div>
  );
};
