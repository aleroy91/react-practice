import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { mockData } from './mockData.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

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

const TableRow = ({ player, onClick }) => {
  return (
    <tr
      key={player.number}
      onClick={onClick}
      className="table__row"
    >
      <td className="table__data-cell">{player.name}</td>
      <td className="table__data-cell">{player.position}</td>
      <td className="table__data-cell">{player.price}</td>
    </tr>
  ); 
}

const Table = ({players, displayPlayer}) => {
  const playerTable = players.map((player) => 
  <TableRow 
    key={player.number}
    player={player}
    number={player.number}
    onClick={() => displayPlayer(player.number)} 
  />);

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__header">Name</th>
          <th className="table__header">Position</th>
          <th className="table__header">Price</th>
        </tr>
      </thead>
      <tbody>
        {playerTable}
      </tbody>
    </table>
  );
}

// WIP for an array of modals
const ModalsArray = props => {
  const {selectedPlayersArray, playersData, updatePlayerInfo} = {...props};
  const modalsFromArray = selectedPlayersArray.map((selectedPlayerId) =>
    <Modal
      hide={false}
      playerIndex={selectedPlayerId} 
      player={playersData[selectedPlayerId]} 
      updatePlayerInfo={updatePlayerInfo} 
    />
  );

  return (
    <div className="horizontal-container">
      {modalsFromArray}
    </div>
  );
}

const Modal = props => {
  return (
    <div className="container">
        <div className="modal">
          <Player {...props} />
        </div>
    </div>
  );
}

// Needs some cleanup
const Container = ({data}) => {
  const [playersData, setPlayersdata] = useState(data);
  const [selectedPlayersArray, setSelectedPlayersArray] = useState([]);

  const updatePlayerInfo = (playerId, playerNotes) => {
    playersData[playerId] = {...playersData[playerId], notes: playerNotes}
    setPlayersdata(playersData);
  };
  const displayPlayer = (playerId) => {
    let newSelectedPlayersArray = selectedPlayersArray;
    
    if (selectedPlayersArray.includes(playerId) && (selectedPlayersArray.length > 0)) {
      // If player id already selected, remove from selected players array
      let indexToRemove;
      
      selectedPlayersArray.forEach((element, index) => {
        if (element === playerId) {
          indexToRemove = index;
        }
      });
      
      if (indexToRemove === undefined) {
        console.error(`indexToRemove has not been set. The value of indexToRemove is ${indexToRemove}`);
      }
      
      newSelectedPlayersArray.splice(indexToRemove, 1);
    } else {
      // If player id not already selected, add to selected players array
      newSelectedPlayersArray.push(playerId);
    }
    setSelectedPlayersArray([...newSelectedPlayersArray]);
  };

  return (
    <div className="container">
      <ModalsArray 
        selectedPlayersArray={selectedPlayersArray}
        playersData={playersData} 
        updatePlayerInfo={updatePlayerInfo} 
      />
      <Table 
        players={playersData} 
        displayPlayer={displayPlayer} 
      />
    </div>
  );
}
    
root.render(<Container data={mockData} />);
