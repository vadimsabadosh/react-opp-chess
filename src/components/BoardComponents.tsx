import React, { useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponents from "./CellComponents";

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
}

const BoardComponents: React.FC<BoardProps> = ({
	board,
	setBoard,
	swapPlayer,
	currentPlayer,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	useEffect(() => {
		highlightCells();
	}, [selectedCell]);

	function handleClick(cell: Cell) {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
			updateBoard();
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell);
			}
		}
	}

	function highlightCells() {
		board.highlightCells(selectedCell);
		updateBoard();
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}
	return (
		<div>
			<h3>Current Player - {currentPlayer?.color}</h3>
			<div className="board">
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map((cell) => (
							<CellComponents
								key={cell.id}
								cell={cell}
								handleClick={handleClick}
								selectedCell={
									cell.x === selectedCell?.x && cell.y === selectedCell?.y
								}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default BoardComponents;
