
export default function Log({gameTurns}){
    return (
        <ol id="log">
            {gameTurns.map((turn, index) => (
                <li key={index} className={index === gameTurns.length - 1 ? 'highlighted' : ''}>{turn.player} played {turn.square.row}, {turn.square.col}</li>
            ))}
        </ol>

    );
}