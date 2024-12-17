import { useState} from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winningCombination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function derivedActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
  
}

function derivedGameBoard(gameTurns) {

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  

  for(const turn of gameTurns) {
      const {square , player} = turn;
      const {row, col} = square;
  
      gameBoard[row][col] = player;
  }

  return gameBoard;

}

function derivedWinner (gameBoard, players) {

  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
      ) {
      winner = players[firstSquare];
    }
  }

  return winner;

}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const activePlayer = derivedActivePlayer(gameTurns);
  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurns =>{
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [{ square:{row:rowIndex, col:colIndex}, player:currentPlayer },...prevTurns];

      return updatedTurns;
    });
  };

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      };
    }); 
  }

  function handleResetGame() {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestartGame={handleResetGame} />}
        <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  );
}

export default App
