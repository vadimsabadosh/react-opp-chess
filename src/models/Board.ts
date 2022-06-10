import { Figure } from "./figures/Figure";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Colors } from "./Colors";
import { Cell } from "./Cell";

export class Board {
	cells: Cell[][] = [];
	blackLostFigures: Figure[] = [];
	whiteLostFigures: Figure[] = [];

	public initCells(): void {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null)); //black
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null)); //white
				}
			}
			this.cells.push(row);
		}
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const cell = row[j];
				cell.available = selectedCell?.figure?.canMove(cell) ?? false;
			}
		}
	}

	public getCopyBoard(): Board {
		const board = new Board();
		board.cells = this.cells;
		board.whiteLostFigures = this.whiteLostFigures;
		board.blackLostFigures = this.blackLostFigures;
		return board;
	}

	public getCell(x: number, y: number): Cell {
		return this.cells[y][x];
	}

	public addPawns(): void {
		for (let i = 0; i < 8; i++) {
			new Pawn(this.getCell(i, 1), Colors.BLACK);
			new Pawn(this.getCell(i, 6), Colors.WHITE);
		}
	}
	public addQueen(): void {
		new Queen(this.getCell(3, 0), Colors.BLACK);
		new Queen(this.getCell(3, 7), Colors.WHITE);
	}
	public addKing(): void {
		new King(this.getCell(4, 0), Colors.BLACK);
		new King(this.getCell(4, 7), Colors.WHITE);
	}
	public addBishop(): void {
		new Bishop(this.getCell(2, 0), Colors.BLACK);
		new Bishop(this.getCell(5, 0), Colors.BLACK);
		new Bishop(this.getCell(2, 7), Colors.WHITE);
		new Bishop(this.getCell(5, 7), Colors.WHITE);
	}
	public addRook(): void {
		new Rook(this.getCell(0, 0), Colors.BLACK);
		new Rook(this.getCell(7, 0), Colors.BLACK);
		new Rook(this.getCell(0, 7), Colors.WHITE);
		new Rook(this.getCell(7, 7), Colors.WHITE);
	}
	public addKnight(): void {
		new Knight(this.getCell(1, 0), Colors.BLACK);
		new Knight(this.getCell(6, 0), Colors.BLACK);
		new Knight(this.getCell(1, 7), Colors.WHITE);
		new Knight(this.getCell(6, 7), Colors.WHITE);
	}

	public addFigures(): void {
		this.addPawns();
		this.addQueen();
		this.addBishop();
		this.addKing();
		this.addRook();
		this.addKnight();
	}
}
