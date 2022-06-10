import { FigureNames } from "./Figure";
import { Colors } from "./../Colors";
import { Cell } from "./../Cell";
import { Figure } from "./Figure";
import blackLogo from "./../../assets/black-knight.png";
import whiteLogo from "./../../assets/white-knight.png";

export class Knight extends Figure {
	constructor(cell: Cell, color: Colors) {
		super(cell, color);
		this.name = FigureNames.KNIGHT;
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
			return false;
		}
		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);
		return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
	}
}
