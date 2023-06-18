import { useState } from 'react';

function Square({squares, rowIndex, columnIndex, handleClick}) {
  let buttonType;
  if(squares[rowIndex][columnIndex] === null)
    buttonType = "unClicked";
  else if(squares[rowIndex][columnIndex] === 1) // we will set the value of squares[rowIndex][columnIndex] to 1 if it is not a ship square and it is clicked
    buttonType = "clickedAndNotShip";
  else // we will set the value of squares[rowIndex][columnIndex] to 2 if it is a ship square and it is clicked
    buttonType = "clickedAndShip";

  return <button onClick={() => handleClick(rowIndex, columnIndex)} className={buttonType}></button>;
}

function BattleShipGame() {
  const [squares, setSquares] = useState(Array(9).fill(Array(9).fill(null)));
  const [moves, setMoves] = useState(0);
  const [hitNumberOfshipSquares, setHitNumberOfShipSquares] = useState(-1); 
  const [shipSquares, setShipSquares] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  function isShipSquare(rowIndex, columnIndex){
    for(let i = 0; i<shipSquares.length; i++){
      if(shipSquares[i][0] === rowIndex && shipSquares[i][1] === columnIndex)
        return true;
    }

    return false;
  }

  function getRandomInt(lessThan){
    return Math.floor(Math.random() * lessThan);
  }

  function addShip(newShipSquares) { // adds a ship of size 5 to our board
    while(true){
      let row = getRandomInt(9);
      let column = getRandomInt(9);
      let orientation = getRandomInt(2);

      let dr = 0;
      let dc = 0;

      if(orientation === 0)
        dr = 1;
      else  
        dc = 1;

      let validShip = true;

      for(let i = 0; i<5; i++){
        let newRow = row + i * dr;
        let newColumn = column + i * dc;

        let alreadyShipSquare = false;
        for(let i = 0; i<newShipSquares.length; i++){
          if(newShipSquares[i][0] === newRow && newShipSquares[i][1] === newColumn){
            alreadyShipSquare = true;
            break;
          }
        }
        if(newRow === 9 || newColumn === 9 || alreadyShipSquare) {
          validShip = false;
          break;
        }
      }

      if(validShip){
        for(let i =0; i<5; i++){  
          let newRow = row + i * dr;
          let newColumn = column + i * dc;

          newShipSquares.push([newRow, newColumn]);
        }
        break;
      }
    }
  }

  function resetBoard() {
    const newSquares = squares.map((item) => item.slice());
    for(let i = 0; i<newSquares.length; i++)
      for(let j = 0; j<newSquares[i].length; j++)
        newSquares[i][j] = null;

    setSquares(newSquares);
    setMoves(0);
    setHitNumberOfShipSquares(0);
    let newShipSquares = [];
    addShip(newShipSquares);
    addShip(newShipSquares);
    setShipSquares(newShipSquares);
    setGameStarted(true);
  }

  function handleClick(rowIndex, columnIndex) {
    if(!gameStarted || hitNumberOfshipSquares === shipSquares.length || squares[rowIndex][columnIndex])
      return;
    const newSquares = squares.map((item) => item.slice());
    if(!isShipSquare(rowIndex, columnIndex)) // if the square at (rowIndex, columnIndex) is not a ship square
      newSquares[rowIndex][columnIndex] = 1;
    else {
      newSquares[rowIndex][columnIndex] = 2;
      setHitNumberOfShipSquares(hitNumberOfshipSquares+1);
    }
    setMoves(moves + 1);
    setSquares(newSquares); 
  }

  return (
    <div className="App">
      {(hitNumberOfshipSquares === shipSquares.length) && 
        <h1>You Win</h1>
      }
      <h2>Number of Moves: {moves}</h2>
      <button onClick = {resetBoard} className="resetButton">Start</button>
      <div>
        {squares.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((column, columnIndex) => (
              <Square key={columnIndex} squares={squares} rowIndex={rowIndex} columnIndex={columnIndex} handleClick={handleClick}/>
            ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <BattleShipGame/>
    </div>
  );
}

// testing 2
