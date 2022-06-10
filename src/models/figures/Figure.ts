import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import logo from "../../assets/black-king.png";

export enum FigureNames {
	KING = "Король",
	KNIGHT = "Конь",
	PAWN = "Пешка",
	QUEEN = "Ферзь",
	ROOK = "Ладья",
	BISHOP = "Слон",
	FIGURE = "Фигура",
}
export class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureNames;
	id: number;

	constructor(cell: Cell, color: Colors) {
		this.cell = cell;
		this.color = color;
		this.cell.figure = this;
		this.id = Math.random();
		this.logo = null;
		this.name = FigureNames.FIGURE;
	}

	canMove(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false;
		}
		if (target.figure?.name === FigureNames.KING) {
			return false;
		}
		return true;
	}

	moveFigure(target: Cell): void {
		this.cell = target;
	}
}
