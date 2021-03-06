import { FigureNames } from "./Figure";
import { Colors } from "./../Colors";
import { Cell } from "./../Cell";
import { Figure } from "./Figure";
import blackLogo from "./../../assets/black-pawn.png";
import whiteLogo from "./../../assets/white-pawn.png";

export class Pawn extends Figure {
	isFirstStep: boolean = true;
	constructor(cell: Cell, color: Colors) {
		super(cell, color);
		this.name = FigureNames.PAWN;
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
			return false;
		}

		const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
		const firstStepDirection =
			this.cell.figure?.color === Colors.BLACK ? 2 : -2;

		const dir = target.y === this.cell.y + direction;
		const firstStep =
			this.isFirstStep && target.y === this.cell.y + firstStepDirection;

		if (
			(dir || firstStep) &&
			target.x === this.cell.x &&
			this.cell.board.getCell(target.x, target.y).isEmpty()
		) {
			return true;
		}

		if (
			target.y === this.cell.y + direction &&
			(target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
			this.cell.isEnemy(target)
		) {
			return true;
		}
		return false;
	}

	moveFigure(target: Cell): void {
		super.moveFigure(target);
		this.isFirstStep = false;
	}
}
