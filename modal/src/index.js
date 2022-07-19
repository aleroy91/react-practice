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
  const photo = "https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png";
  const gif = "https://media0.giphy.com/media/61nKC1dCr6yCDrAs3m/giphy.gif?cid=ecf05e47ol31uwoxeisjlc5f6xg4zypw7ilboas8mlhw0lon&rid=giphy.gif&ct=g";
  const [avatar, setAvatar] = useState(photo);

  const toggleAvatar = () => setAvatar(() => (avatar === photo) ? gif: photo);
    
  return (
    <div className="profile">
      <Name name="Bruno Fernandes" />
      <Avatar 
        src={avatar} 
        alt={"Bruno Fernandes"} 
        onMouseEnter={toggleAvatar} 
        onMouseLeave={toggleAvatar} 
      />
      <Position position="Midfield" />
      <Price price="10" />
    </div>
  );
}

function PlayerList(props) {
  const players = props.players;
  const playerList = players.map((player) => <li key={player.number}>{player.name}</li>);

  return <ol>{playerList}</ol>;
}

function Modal(props) {
  return (
    <div className="modal">
      <Player/>
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

  return (<PlayerList players={players} />)
}
    
root.render(
  <div className="container">
    <Modal />
    <Table />
  </div>
);
