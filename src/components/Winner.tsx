import React from "react";
import { Colors } from "../models/Colors";
interface WinnerProps {
	winner: Colors | null;
	setWinner: (str: Colors | null) => void;
}
const Winner: React.FC<WinnerProps> = ({ winner, setWinner }) => {
	if (!winner) {
		return null;
	}
	const closeModal = () => {
		setWinner(null);
	};
	return (
		<div className="overlay" onClick={closeModal}>
			<div className="modal">
				<div className="modal-content">
					<h1>{winner} player won!</h1>
					<button className="btn" onClick={closeModal}>
						Close window
					</button>
				</div>
			</div>
		</div>
	);
};

export default Winner;
