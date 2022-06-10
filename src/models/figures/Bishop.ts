import { FigureNames } from "./Figure";
import { Colors } from "./../Colors";
import { Cell } from "./../Cell";
import { Figure } from "./Figure";
import blackLogo from "./../../assets/black-bishop.png";
import whiteLogo from "./../../assets/white-bishop.png";

export class Bishop extends Figure {
	constructor(cell: Cell, color: Colors) {
		super(cell, color);
		this.name = FigureNames.BISHOP;
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
			return false;
		}
		if (this.cell.isEmptyDiagonal(target)) {
			return true;
		}
		return false;
	}
}
