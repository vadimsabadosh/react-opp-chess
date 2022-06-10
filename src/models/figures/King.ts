import { FigureNames } from "./Figure";
import { Colors } from "./../Colors";
import { Cell } from "./../Cell";
import { Figure } from "./Figure";
import blackLogo from "./../../assets/black-king.png";
import whiteLogo from "./../../assets/white-king.png";

export class King extends Figure {
	constructor(cell: Cell, color: Colors) {
		super(cell, color);
		this.name = FigureNames.KING;
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
	}
	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
			return false;
		}

		const vertical =
			(this.cell.x === target.x && this.cell.y - 1 === target.y) ||
			(this.cell.x === target.x && this.cell.y + 1 === target.y);
		const horizontal =
			(this.cell.x - 1 === target.x && this.cell.y === target.y) ||
			(this.cell.x + 1 === target.x && this.cell.y === target.y);
		const diagonalLeft =
			(this.cell.x - 1 === target.x && this.cell.y - 1 === target.y) ||
			(this.cell.x + 1 === target.x && this.cell.y + 1 === target.y);
		const diagonalRight =
			(this.cell.x + 1 === target.x && this.cell.y - 1 === target.y) ||
			(this.cell.x - 1 === target.x && this.cell.y + 1 === target.y);

		if (vertical || horizontal || diagonalLeft || diagonalRight) {
			return true;
		}
		return false;
	}
}
