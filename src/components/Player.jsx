import { useState } from "react";

export default function Player ({name, symbol, isActive, onPlayerNameChange}) {
    const [isEditing, setEditing] = useState(false);
    const [player, setPlayer] = useState(name);

    function handleEditClick(){
      setEditing((editing) => !editing);
      if (isEditing){
        onPlayerNameChange(symbol, player);
      }
  
    }

    return (
        <li className={isActive ? 'active' : ''}>
        <span className="player">
        {!isEditing && <span className="player-name">{player}</span>}
        {isEditing && (
          <input
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
        )}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing? 'Save' : 'Edit'}</button>
      </li>
    );
}