import React, { useEffect, useRef } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
interface TimerProps {
	currentPlayer: Player | null;
	restart: () => void;
	setWinner: (str: Colors | null) => void;
}

const SECONDS = 10;
const Timer: React.FC<TimerProps> = ({ currentPlayer, restart, setWinner }) => {
	const [blackTime, setBlackTime] = React.useState(SECONDS);
	const [whiteTime, setWhiteTime] = React.useState(SECONDS);

	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}
		const callback =
			currentPlayer?.color === Colors.WHITE
				? decrementWhiteTimer
				: decrementBlackTimer;
		timer.current = setInterval(callback, 1000);
	}
	function stopTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}
	}

	useEffect(() => {
		startTimer();
		setWinner(null);
	}, [currentPlayer]);

	function decrementBlackTimer() {
		setBlackTime((blackTime) => blackTime - 1);
	}

	useEffect(() => {
		if (whiteTime === 0) {
			console.log(1);
			stopTimer();
			setWinner(Colors.BLACK);
		}
		if (blackTime === 0) {
			console.log(1);
			stopTimer();
			setWinner(Colors.WHITE);
		}
	}, [blackTime, whiteTime]);

	function decrementWhiteTimer() {
		setWhiteTime((whiteTime) => whiteTime - 1);
	}

	const handleRestart = () => {
		setBlackTime(SECONDS);
		setWhiteTime(SECONDS);
		restart();
		startTimer();
		setWinner(null);
	};

	return (
		<div className="timer">
			<div>
				<button onClick={handleRestart} className="btn">
					Restart game
				</button>
			</div>
			<h2>Black = {blackTime}</h2>
			<h2>White = {whiteTime}</h2>
		</div>
	);
};

export default Timer;
