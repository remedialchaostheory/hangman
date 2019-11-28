import React, { Component } from "react";
import "./Hangman.css";
import AlphaButtons from "./AlphaButtons";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      gameWon: false,
      nWrong: 0,
      nRight: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));

    // const countInAnswer = this.state.answer.split(ltr).length - 1;
    // if (
    //   this.state.nRight === this.state.answer.length - countInAnswer &&
    //   this.state.answer.includes(ltr)
    // ) {
    //   this.setState(st => ({ gameWon: true }));
    // }
    // console.log("countInAnswer ->", countInAnswer);
    // countInAnswer
    //   ? this.setState(st => ({
    //       nRight: st.nRight + countInAnswer
    //     }))
    //   : this.setState(st => ({
    //       guessed: st.guessed.add(ltr),
    //       nWrong: st.nWrong + 1
    //     }));
    // if (this.state.nRight === this.state.answer.length) {
    //   this.setState({ gameWon: true });
    // }
    // this.state.nRight === this.state.answer.length &&
    //   this.setState({ gameWon: true });
  }

  handleRestart() {
    this.setState({
      gameWon: false,
      answer: randomWord(),
      nRight: 0,
      nWrong: 0,
      guessed: new Set()
    });
  }

  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong} of 6 wrong guesses`}
        />
        <p># of wrong guesses: {this.state.nWrong}</p>
        {this.state.gameWon && <p>You won!!</p>}
        <p className="Hangman-word">{this.guessedWord()}</p>
        {this.state.nWrong < this.props.maxWrong ? (
          <AlphaButtons
            handleGuess={this.handleGuess}
            guessed={this.state.guessed}
            gameWon={this.state.gameWon}
          />
        ) : (
          <p>Sorry you lost..</p>
        )}
        <div>
          <button className="Hangman-restart-btn" onClick={this.handleRestart}>
            Restart
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
