import React, { Component } from "react";

class AlphaButtons extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.props.handleGuess}
        // disabled={this.props.gameWon && this.props.guessed.has(ltr)}
        disabled={this.props.gameWon ? true : this.props.guessed.has(ltr)}
        key={ltr}
        className={this.props.guessed.has(ltr) && "guessed"}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    return (
      <div>
        <p className="Hangman-btns">{this.generateButtons()}</p>
      </div>
    );
  }
}

export default AlphaButtons;
