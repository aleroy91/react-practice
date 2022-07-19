import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Name(props) {
  return <h1>{props.name}</h1>;
}

function Position(props) {
  return <h2>Position: {props.position}</h2>;
}

function Price(props) {
  return <h2>Price: {props.price}m</h2>;
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

function Player(props) {
  const photo = props.player.photo;
  const gif = props.player.gif;
  const [avatar, setAvatar] = useState(photo);

  const toggleAvatar = () => setAvatar(() => (avatar === photo) ? gif: photo);
    
  return (
    <div className="profile">
      <Name name={props.player.name} />
      <Avatar 
        src={avatar} 
        alt={props.player.name} 
        onMouseEnter={toggleAvatar} 
        onMouseLeave={toggleAvatar} 
      />
      <Position position={props.player.position} />
      <Price price={props.player.price} />
    </div>
  );
}

function ListElement(props) {
  return (
    <li
      key={props.number}
      onClick={() => props.onClick(props.player)}
    >
      {props.player.name}
    </li>
  ); 
}

function List(props) {
  const players = props.players;
  const playerList = players.map(
    (player) => {
      return (
        <ListElement 
          player={player}
          number={player.number}
          onClick={props.onClick} 
        />
      );
    }
  );

  return <ol>{playerList}</ol>;
}

function Modal(props) {
  return (
    <div className="modal">
      <Player player={props.player} />
    </div>
  );
}

function Table(props) {
  const players = [
    {
      number: 1,
      name: 'Bruno Fernandes',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png',
      gif: 'https://media0.giphy.com/media/61nKC1dCr6yCDrAs3m/giphy.gif?cid=ecf05e47ol31uwoxeisjlc5f6xg4zypw7ilboas8mlhw0lon&rid=giphy.gif&ct=g',
      position: "Midfield",
      price: 10
    }, {
      number: 2,
      name: 'Harry Maguire',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p95658.png',
      gif: 'https://media1.giphy.com/media/IhPL2nHX5cEdnvQ6mN/giphy.gif',
      position: "Defence",
      price: 5
    }, {
      number: 3,
      name: 'Christian Eriksen',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p80607.png',
      gif: 'https://media.giphy.com/media/55iSqlzQ8CbYWnbCBn/giphy.gif',
      position: "Midfield",
      price: 6.5
    }, {
      number: 4,
      name: 'Jadon Sancho',
      photo: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p209243.png',
      gif: 'https://media.giphy.com/media/AbWzDpbWYTh9l1B3tc/giphy-downsized-large.gif',
      position: "Midfield",
      price: 7.5
    } 
  ];
  let [selectedPlayer, setPlayer] = useState(players[0]);
  const displayPlayer = (newPlayer) => setPlayer(() => selectedPlayer = newPlayer);

  return (
    <div className="container">
      <Modal player={selectedPlayer} />
      <List players={players} onClick={displayPlayer} />
    </div>
  );
}
    
root.render(<Table />);
