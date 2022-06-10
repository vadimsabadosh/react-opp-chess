import React, { useEffect } from "react";
import "./App.css";
import BoardComponents from "./components/BoardComponents";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import Winner from "./components/Winner";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
const App = () => {
	const [board, setBoard] = React.useState(new Board());
	const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);
	const [winner, setWinner] = React.useState<Colors | null>(null);
	useEffect(() => {
		restart();
		setCurrentPlayer(new Player(Colors.WHITE));
	}, []);

	function swapPlayer() {
		setCurrentPlayer(
			currentPlayer?.color === Colors.WHITE
				? new Player(Colors.BLACK)
				: new Player(Colors.WHITE)
		);
	}

	function restart() {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	}
	return (
		<div className="app">
			<Winner winner={winner} setWinner={setWinner} />
			<Timer
				restart={restart}
				currentPlayer={currentPlayer}
				setWinner={setWinner}
			/>
			<BoardComponents
				board={board}
				setBoard={setBoard}
				swapPlayer={swapPlayer}
				currentPlayer={currentPlayer}
			/>
			<LostFigures title="Black figures" figures={board.blackLostFigures} />
			<LostFigures title="White figures" figures={board.whiteLostFigures} />
		</div>
	);
};

export default App;
