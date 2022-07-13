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

function Modal(props) {
  return (
    <div className="modal">
      <Player/>
    </div>
  );
}
    
root.render(<Modal />);
