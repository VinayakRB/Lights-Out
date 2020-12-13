import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
	static defaultProps = {
		isLit: false,
	};
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(evt) {
		// call up to the board to flip cells around this cell
		this.props.flipCellsAroundMe(evt.target.dataset.coord);
	}

	render() {
		let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
		return (
			<td
				className={classes}
				onClick={this.handleClick}
				data-coord={this.props.coords}
			/>
		);
	}
}

export default Cell;
