import React from "react";
import { Cell } from "../models/Cell";

interface CellProps {
	cell: Cell;
	selectedCell: boolean;
	handleClick: (cell: Cell) => void;
}
const CellComponents: React.FC<CellProps> = ({
	cell,
	selectedCell,
	handleClick,
}) => {
	return (
		<div
			className={["cell", cell.color, selectedCell ? "selected" : null].join(
				" "
			)}
			onClick={() => handleClick(cell)}
			style={{ background: cell.available && cell.figure ? "green" : "" }}
		>
			{cell.available && !cell.figure && <div className="available"></div>}
			{cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
		</div>
	);
};

export default CellComponents;
