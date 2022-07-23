import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Name(props) {
  return <h1>{props.name}</h1>;
}

function Avatar(props) {
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

function Position(props) {
  return <h2>Position: {props.position}</h2>;
}  

function Price(props) {
  return <h2>Price: {props.price}m</h2>;
}  

function Notes(props) {
  const [showEdit, setShowEdit] = useState(false);
  const toggleNotes = () => setShowEdit(() => showEdit ? false : true);

  const notesText = <p>{props.value}</p>
  const textField = <textarea 
    value={props.value} 
    onChange={(event) => props.onChange(event)} 
    className="element__standard-margin"
  />;  
  const notesButton = <button 
    onClick={() => toggleNotes()}
    className='element--shrinkwrap'>
      {showEdit ? "Save" : "Write"} Notes
  </button>;    

  return (
    <div className="column__flexbox">
      {showEdit ? textField : notesText}
      {notesButton}
    </div>
  );
}

function Player(props) {
  const photo = props.player.photo;
  const gif = props.player.gif;
  const notes = props.player.notes;

  const [avatar, setAvatar] = useState(photo);
  let [playerNotes, setPlayerNotes] = useState(notes);

  const toggleAvatar = () => setAvatar(() => (avatar === photo) ? gif: photo);
  const editNotes = (event) => setPlayerNotes(event.target.value);
    
  return (
    <div className="column__flexbox">
      <Name name={props.player.name} />
      <Avatar 
        src={avatar} 
        alt={props.player.name} 
        onMouseEnter={toggleAvatar} 
        onMouseLeave={toggleAvatar} 
      />
      <Position position={props.player.position} />
      <Price price={props.player.price} />
      <Notes 
        value={playerNotes} 
        onChange={editNotes}
      />
    </div>
  );
}

function TableRow(props) {
  return (
    <tr
      key={props.number}
      onClick={() => props.onClick(props.player)}
      className="table__row"
    >
      <td className="element__standard-padding">{props.player.name}</td>
      <td className="element__standard-padding">{props.player.position}</td>
      <td className="element__standard-padding">{props.player.price}</td>
    </tr>
  ); 
}

function Table(props) {
  const players = props.players;
  const playerTable = players.map((player) => 
  <TableRow 
    key={player.number}
    player={player}
    number={player.number}
    onClick={props.onClick} 
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

function Modal(props) {
  return (
    <div className="modal element__standard-margin">
      <Player player={props.player} />
    </div>
  );
}

function Container(props) {
  const players = [
    {
      number: 1,
      name: 'Bruno Fernandes',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png',
      gif: 'https://media0.giphy.com/media/61nKC1dCr6yCDrAs3m/giphy.gif?cid=ecf05e47ol31uwoxeisjlc5f6xg4zypw7ilboas8mlhw0lon&rid=giphy.gif&ct=g',
      position: "Midfield",
      price: 10,
      notes: ''
    }, {
      number: 2,
      name: 'Harry Maguire',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p95658.png',
      gif: 'https://media1.giphy.com/media/IhPL2nHX5cEdnvQ6mN/giphy.gif',
      position: "Defence",
      price: 5,
      notes: ''
    }, {
      number: 3,
      name: 'Christian Eriksen',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p80607.png',
      gif: 'https://media.giphy.com/media/55iSqlzQ8CbYWnbCBn/giphy.gif',
      position: "Midfield",
      price: 6.5,
      notes: ''
    }, {
      number: 4,
      name: 'Jadon Sancho',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p209243.png',
      gif: 'https://media.giphy.com/media/AbWzDpbWYTh9l1B3tc/giphy-downsized-large.gif',
      position: "Midfield",
      price: 7.5,
      notes: ''
    } 
  ];
  let [selectedPlayer, setPlayer] = useState(players[0]);
  const displayPlayer = (newPlayer) => setPlayer(() => selectedPlayer = newPlayer);

  return (
    <div className="container">
      <Modal player={selectedPlayer} />
      <Table players={players} onClick={displayPlayer} />
    </div>
  );
}
    
root.render(<Container />);
