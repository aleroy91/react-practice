import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { mockData } from './mockData.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Name = props => {
  return <h1>{props.name}</h1>;
}

const Avatar = props => {
  return (
    <div className="image--container">
      <img 
        className="image" 
        src={props.src} 
        alt={props.name} 
        onMouseEnter={() => props.onMouseEnter()} 
        onMouseLeave={() => props.onMouseLeave()} 
      />
    </div>
  );
}

const Position = props => {
  return <h2>Position: {props.position}</h2>;
}  

const Price = props => {
  return <h2>Price: {props.price}m</h2>;
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
      {textField}
    </div>
  );
}

const Player = ({ playerIndex, player, updatePlayerInfo }) => {
  const { name, number, position, price, photo, gif, notes } = {...player};
  const [avatar, setAvatar] = useState(photo);

  const toggleAvatar = () => setAvatar(() => (avatar === photo) ? gif: photo);
  const handleNoteschange = (updatedNotes) => updatePlayerInfo(playerIndex, updatedNotes);
    
  return (
    <div key={number} className="column__flexbox">
      <Name name={name} />
      <Avatar 
        src={avatar} 
        alt={name} 
        onMouseEnter={toggleAvatar} 
        onMouseLeave={toggleAvatar} 
      />
      <Position position={position} />
      <Price price={price} />
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
    <div className="modal element__standard-margin">
      <Player {...props} />
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
