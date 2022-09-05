import React, { useState } from 'react';

export const ModalsArray = props => {
    const {selectedPlayersArray, playersData, updatePlayerInfo, displayPlayer} = {...props};
    const modalsFromArray = selectedPlayersArray.map((selectedPlayerId) =>
      <Modal
        hide={false}
        playerIndex={selectedPlayerId} 
        player={playersData[selectedPlayerId]} 
        updatePlayerInfo={updatePlayerInfo} 
        displayPlayer={displayPlayer} 
      />
    );
  
    return (
      <div className="horizontal-container">
        {modalsFromArray}
      </div>
    );
  }
  
  const Modal = props => {
    const {displayPlayer, playerIndex} = {...props}
  
    return (
      <div className="container">
          <div className="modal">
            <button 
              className="button__exit"
              onClick={() => displayPlayer(playerIndex)}
            >X</button>
            <Player {...props} />
          </div>
      </div>
    );
  }

  const Player = ({ playerIndex, player, updatePlayerInfo }) => {
    const { name, number, position, price, photo, gif, notes } = {...player};
    const [hoverState, setHoverState] = useState(false);
  
    const toggleGif = () => setHoverState(() => hoverState ? false : true);
    const handleNoteschange = (updatedNotes) => updatePlayerInfo(playerIndex, updatedNotes);
  
    return (
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
        <Notes 
          notesText={notes}
          onNotesChange={handleNoteschange}
        />
      </div>
    );
  }

  const Avatar = props => {
    return (
      <div 
        className="image-container"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.isUserHovering
          ? <img 
              className="image-container__image" 
              src={props.gif} 
              alt={props.name} 
            />
          : <img 
              className="image-container__image" 
              src={props.photo} 
              alt={props.name} 
            />
        }
      </div>
    );
  }
  
  const Notes = ({ notesText, onNotesChange }) => {
    const [notes, setNotes] = useState(notesText);
    const [displayNotesHideTextarea, setDisplayNotesHideTextarea] = useState(true);
    const [showSaveNotesButton, setShowSaveNotesButton] = useState(false);
  
    return (
      <div className="vertical-container">
        {(notes && displayNotesHideTextarea) && 
          <p>{notes}</p>
        }
        {!displayNotesHideTextarea && 
          <textarea 
            className="textarea"
            placeholder='Add Notes...'
            autoFocus
            value={notes} 
            onChange={event => {
              setShowSaveNotesButton(true);
              setNotes(event.target.value);
            }} 
          />
        }
        <div className="horizontal-container">
          {displayNotesHideTextarea &&
            <button 
              className="button__action"
              onClick={() => setDisplayNotesHideTextarea(false)}
            >
              {notes ? "Edit" : "Add"} Notes
            </button>
          }
          {showSaveNotesButton &&
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
          }
        </div>
      </div>
    );
  }