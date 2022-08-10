import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { mockData } from './mockData.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Avatar = props => {
  return (
    <div 
      className="image--container"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.isUserHovering
        ? <img 
            className="image" 
            src={props.gif} 
            alt={props.name} 
          />
        : <img 
            className="image" 
            src={props.photo} 
            alt={props.name} 
          />
      }
    </div>
  );
}

const Notes = ({ notesText, onNotesChange }) => {
  const [notes, setNotes] = useState(notesText);

  const textField = <textarea 
    value={notes} 
    onChange={event => {
      setNotes(event.target.value);
      onNotesChange(event.target.value);
    }} 
    className="element__standard-margin"
  />;  

  return (
    <div className="column__flexbox">
      <p>{notes}</p>
      {textField}
      <button>Save Notes</button>
    </div>
  );
}

const Player = ({ playerIndex, player, updatePlayerInfo }) => {
  const { name, number, position, price, photo, gif, notes } = {...player};
  const [hoverState, setHoverState] = useState(false);

  const toggleGif = () => setHoverState(() => hoverState ? false : true);
  const handleNoteschange = (updatedNotes) => updatePlayerInfo(playerIndex, updatedNotes);

  return (
    <div key={number} className="column__flexbox">
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
      <td className="element__standard-padding">{player.name}</td>
      <td className="element__standard-padding">{player.position}</td>
      <td className="element__standard-padding">{player.price}</td>
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
          <th className="table__header element__standard-padding">Name</th>
          <th className="table__header element__standard-padding">Position</th>
          <th className="table__header element__standard-padding">Price</th>
        </tr>
      </thead>
      <tbody>
        {playerTable}
      </tbody>
    </table>
  );
}

const Modal = props => {
  return (
    <div className="container">
        <div className="modal element--shrinkwrap">
          <Player {...props} />
        </div>
    </div>
  );
}

const Container = ({data}) => {
  const [playersData, setPlayersdata] = useState(data);
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);

  const updatePlayerInfo = (playerId, playerNotes) => {
    playersData[playerId] = {...playersData[playerId], notes: playerNotes}
    setPlayersdata(playersData);
  };
  const displayPlayer = (playerId) => setSelectedPlayerId(playerId);

  return (
    <div className="container">
      <Modal 
        hide={false}
        playerIndex={selectedPlayerId} 
        player={playersData[selectedPlayerId]} 
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
