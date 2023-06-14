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
  const [numberOfShipSquares, setNumberofShipSquares] = useState(0);
  const [hitNumberOfshipSquares, setHitNumberOfShipSquares] = useState(-1); 
  const [shipSquares, setShipSquares] = useState([[]]);

  // function addShip() { // adds a ship of size 5 to our board
  //   let validShip = false;
  //   let dr = 0;
  //   let dc = 0;
  //   while(!validShip) {
  //     let row = Math.floor(Math.random() * 9);
  //     let column = Math.floor(Math.random() * 9);
  //     let orientation = Math.floor(Math.random() * 2);
  //     if(orientation === 0){ // vertical
  //       dr = 1;
  //     }
  //     else // horizontal
  //       dc = 1;

  //     validShip = true;
  //     for(let i = 0; i<5; i++){
  //       if(row >= 9 || column >= 9 || shipSquares.includes([row, column])) {
  //         validShip = false;
  //         break;
  //       }

  //       row += dr;
  //       column += dc;
  //     }

  //     if(validShip) {
  //       console.log(row + ' ' + column);
  //       for(let i = 0; i<5; i++) {
  //         let newShipSquares = shipSquares.map((item) => item.slice());
  //         newShipSquares.push([row, column]);
  //         setShipSquares(newShipSquares);
  //         row += dr;
  //         column += dc;
  //       }
  //       setNumberofShipSquares(numberOfShipSquares + 5);
  //     }
  //   }
  // }

  function resetBoard() {
    const newSquares = squares.map((item) => item.slice());
    for(let i = 0; i<newSquares.length; i++)
      for(let j = 0; j<newSquares[i].length; j++)
        newSquares[i][j] = null;

    setSquares(newSquares);
    setMoves(0);
    setNumberofShipSquares(10);
    setHitNumberOfShipSquares(0);
    let newShipSquares = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8]];
    setShipSquares(newShipSquares);
    // addShip();
    // addShip();
  }


  function isShipSquare(rowIndex, columnIndex) {
    for(let i = 0; i<shipSquares.length; i++){
      if(shipSquares[i][0] === rowIndex && shipSquares[i][1] === columnIndex)
        return true;
    }

    return false;
  }

  function handleClick(rowIndex, columnIndex) {
    if(hitNumberOfshipSquares === numberOfShipSquares || squares[rowIndex][columnIndex])
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
      {(hitNumberOfshipSquares === numberOfShipSquares) && 
        <h1>You Win</h1>
      }
      <h2>Number of Moves: {moves}</h2>
      <button onClick = {resetBoard} className="startButton">Start</button>
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
