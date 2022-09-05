import React from 'react';
  
  export const Table = ({players, displayPlayer, selectedPlayersArray}) => {
    const playerTable = players.map((player) => {
      let isPlayerSelected = false;
      
      if (selectedPlayersArray.includes(player.number)) {
        isPlayerSelected = true;
      }
  
      return <TableRow 
        key={player.number}
        player={player}
        number={player.number}
        isPlayerSelected={isPlayerSelected}
        onClick={() => displayPlayer(player.number)} 
      />
    });
  
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

  const TableRow = ({ player, onClick, isPlayerSelected }) => {
    let rowClass = "table__row";
  
    if (isPlayerSelected) {
      rowClass = "table__row--selected";
    }
  
    return (
      <tr
        key={player.number}
        onClick={onClick}
        className={rowClass}
      >
        <td className="table__data-cell">{player.name}</td>
        <td className="table__data-cell">{player.position}</td>
        <td className="table__data-cell">{player.price}</td>
      </tr>
    ); 
  }