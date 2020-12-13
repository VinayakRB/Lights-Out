import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
	static defaultProps = {
		nrows: 3,
		ncols: 3,
	};
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard(),
			startGame: false,
		};
		this.flipCellsAround = this.flipCellsAround.bind(this);
		this.checkValidCell = this.checkValidCell.bind(this);
		this.flipCell = this.flipCell.bind(this);
		this.startGame = this.startGame.bind(this);
	}

	//return 0 or 1 to check true or false
	getRandom() {
		return Math.round(Math.random());
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	createBoard() {
		let board = Array.from({ length: this.props.nrows }, () => {
			return Array.from({ length: this.props.nrows }, () => !this.getRandom());
		});
		return board;
	}

	//check if the current cell exists with current co-ordinates
	checkValidCell(x, y) {
		let { ncols, nrows } = this.props;
		return x >= 0 && x < ncols && y >= 0 && y < nrows ? true : false;
	}

	/** handle changing a cell: update board & determine if winner */
	flipCell(y, x) {
		let board = this.state.board;
		// if this coord is actually on board, flip it
		if (this.checkValidCell(x, y)) {
			board[y][x] = !board[y][x];
		}
		// win when every cell is turned off
		let hasWon = board.every((row) => row.every((cell) => !cell));
		this.setState({ board, hasWon });
	}

	// TODO: flip this cell and the cells around it
	flipCellsAround(coord) {
		let [x, y] = coord.split("-").map(Number);

		this.flipCell(x, y); //flip current cell
		this.flipCell(x + 1, y); //flip right cell
		this.flipCell(x - 1, y); //flip left cell
		this.flipCell(x, y + 1); //flip lower cell
		this.flipCell(x, y - 1); //flip upper cell
	}

	createTable() {
		return this.state.board.map((cells, i) => {
			return (
				<tr key={i}>
					{cells.map((cell, j) => {
						let coord = `${i}-${j}`;
						return (
							<Cell
								key={coord}
								coords={coord}
								isLit={cell}
								flipCellsAroundMe={this.flipCellsAround}
							/>
						);
					})}
				</tr>
			);
		});
	}

	startGame() {
		this.setState({ startGame: true });
	}

	/** Render game board or winning message. */
	render() {
		// if the game is won, just show a winning msg & render nothing else
		return this.state.hasWon ? (
			<div className="winner Board-title">
				<h1>You Win!</h1>
			</div>
		) : (
			<div>
				{!this.state.startGame ? (
					<div className="Board-title" onClick={this.startGame}>
						<h1>Lights Out</h1>
					</div>
				) : (
					<table className="Board">
						<tbody>{this.createTable()}</tbody>
					</table>
				)}
			</div>
		);
	}
}

export default Board;
