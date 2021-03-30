import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return(
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}
  
class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if(squares[i] != null || calcWinner(squares)) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calcWinner(this.state.squares);
        let status;
        if (winner) {status = 'Winner: ' + winner;}
        else {status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');}
        

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);
  
function calcWinner(squares){
    console.log(squares);
    var diagonal1 = '000'; var diagonal2 = '000';
    for(let i=0; i<3; i++){
        if(squares[i*3] && squares[i*3] === squares[i*3 +1] && squares[i*3] === squares[i*3 +2]){
            return squares[i*3];
        }
        if(squares[i] && squares[i] === squares[i +3] && squares[i] === squares[i +6]){
            return squares[i];
        }
        diagonal1 = diagonal1.replace('0',squares[i*4])
        diagonal2 = diagonal2.replace('0',squares[i*2 +2])
    }
    console.log(diagonal1)
    if(squares[0] && diagonal1 === squares[0].repeat(3)) return squares[0];
    if(squares[2] && diagonal2 === squares[2].repeat(3)) return squares[2];
    return null;
}