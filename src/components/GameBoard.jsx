
export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, cellIndex) => (
                        <button onClick={()=>onSelectSquare(rowIndex, cellIndex)} key={cellIndex} disabled={playerSymbol!==null}>{playerSymbol}</button>
                    ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}