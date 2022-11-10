import React, { useState } from "react";

export const RecordCardsArray = (props) => {
  const {
    selectedRecordsArray,
    recordData,
    updateRecordInfo,
    displayRecordCard,
  } = { ...props };
  const recordCardsFromArray = selectedRecordsArray.map(
    (selectedrecordId, index) => (
      <RecordCard
        key={index}
        hide={false}
        recordIndex={selectedrecordId}
        record={recordData[selectedrecordId]}
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
  const { name, number, position, price, points, expected_points, photo, gif, notes } = { ...record };
  const [hoverState, setHoverState] = useState(false);

  const toggleGif = () => setHoverState(() => (hoverState ? false : true));
  const handleNoteschange = (updatedNotes) =>
    updateRecordInfo(recordIndex, updatedNotes);

  return (
    <div className="container">
      <div className="record-card">
        <button
          className="button__exit"
          onClick={() => displayRecordCard(recordIndex)}
        >
          <span className="material-icons">close</span>
        </button>
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
          <h2>Position: {position}</h2>
          <h2>Price: £{price}m</h2>
          <h2>Points: {points}</h2>
          <h2>Expected Points: {expected_points}</h2>          
          <Notes notesText={notes} onNotesChange={handleNoteschange} />
        </div>
      </div>
    </div>
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
        <textarea
          className="textarea"
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
          <button
            className="button__action"
            onClick={() => setDisplayNotesHideTextarea(false)}
          >
            {notes ? "Edit" : "Add"} Notes
          </button>
        )}
        {showSaveNotesButton && (
          <button
            className="button__submit"
            onClick={() => {
              onNotesChange(notes);
              setDisplayNotesHideTextarea(true);
              setShowSaveNotesButton(false);
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};
