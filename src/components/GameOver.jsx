export default function GameOver({winner, onRestartGame}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} wins!</p>}
            {!winner && <p>Draw</p>}
            <p>
                <button onClick={onRestartGame}>Play Again</button>
            </p>
        </div>
    );
}