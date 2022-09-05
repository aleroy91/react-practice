import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {ModalsArray} from './components/modal';
import {Table} from './components/table';
import { mockData } from './data/mockData';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
        displayPlayer={displayPlayer} 
      />
      <Table 
        selectedPlayersArray={selectedPlayersArray}
        players={playersData} 
        displayPlayer={displayPlayer} 
      />
    </div>
  );
}
    
root.render(<Container data={mockData} />);
