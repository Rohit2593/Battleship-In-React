import { useReducer } from 'react';

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

function getRandomInt(lessThan){
  return Math.floor(Math.random() * lessThan);
}

function isShipSquare(rowIndex, columnIndex, shipSquares){
  for(let i = 0; i<shipSquares.length; i++){
    if(shipSquares[i][0] === rowIndex && shipSquares[i][1] === columnIndex)
      return true;
  }

  return false;
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
      let newRow = row + (i * dr);
      let newColumn = column + (i * dc);

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
        let newRow = row + (i * dr);
        let newColumn = column + (i * dc);

        newShipSquares.push([newRow, newColumn]);
      }
      break;
    }
  }
}

function reducer(state, action){
  switch(action.type) {
    case "clear_squares": {
      return Array(9).fill(Array(9).fill(null));
    }

    case "set_to_zero": {
      return 0;
    }

    case "add_new_ships": {
      let newShipSquares = [];
      addShip(newShipSquares);
      addShip(newShipSquares);
      return newShipSquares;
    }

    case "start_game": {
      return true;
    }

    case "increment_number": {
      return state + 1;
    }

    case "change_board": {
      return action.changeTo;
    }
  }
}


function BattleShipGame() {
  const [squares, setSquares] = useReducer(reducer, Array(9).fill(Array(9).fill(null)));
  const [moves, setMoves] = useReducer(reducer, 0);
  const [hitNumberOfshipSquares, setHitNumberOfShipSquares] = useReducer(reducer, -1); 
  const [shipSquares, setShipSquares] = useReducer(reducer, []);
  const [gameStarted, setGameStarted] = useReducer(reducer, false);

  function resetBoard() {
    setSquares({type: "clear_squares"});
    setMoves({type: "set_to_zero"});
    setHitNumberOfShipSquares({type: "set_to_zero"});
    setShipSquares({type: "add_new_ships"});
    setGameStarted({type: "start_game"});
  }

  function handleClick(rowIndex, columnIndex) {
    if(!gameStarted || hitNumberOfshipSquares === shipSquares.length || squares[rowIndex][columnIndex])
      return;
    const newSquares = squares.map((item) => item.slice());
    if(!isShipSquare(rowIndex, columnIndex, shipSquares)) // if the square at (rowIndex, columnIndex) is not a ship square
      newSquares[rowIndex][columnIndex] = 1;
    else {
      newSquares[rowIndex][columnIndex] = 2;
      setHitNumberOfShipSquares({type: "increment_number"});
    }
    setMoves({type: "increment_number"});
    setSquares({
      type: "change_board",
      changeTo: newSquares
    }); 
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

// testing github action trigger on merge pull request
