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
      gameOver: false,
      gameWon: false,
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      correct: new Set()
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
    const answerSetSize = new Set(this.state.answer).size;
    this.setState(st => ({
      guessed: st.guessed.add(ltr)
    }));
    if (this.state.answer.includes(ltr)) {
      if (this.state.correct.size === answerSetSize - 1) {
        this.setState({ gameWon: true });
        return;
      }
      this.setState(st => ({
        correct: st.correct.add(ltr)
      }));
    } else {
      this.setState(st => ({
        nWrong: st.nWrong + 1
      }));
    }
  }

  handleRestart() {
    this.setState({
      gameOver: false,
      gameWon: false,
      answer: randomWord(),
      nWrong: 0,
      guessed: new Set()
    });
  }

  /** render: render game */
  render() {
    const gameLost = this.state.nWrong >= this.props.maxWrong;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong} of ${this.props.maxWrong} wrong guesses`}
        />
        <p># of wrong guesses: {this.state.nWrong}</p>
        {this.state.gameWon && <p>You won!!</p>}
        <p className="Hangman-word">
          {gameLost ? this.state.answer : this.guessedWord()}
        </p>
        {gameLost ? (
          <p>Sorry you lost..</p>
        ) : (
          // {() => {this.setState({guessed: new Set(this.state.answer)})}}
          <AlphaButtons
            handleGuess={this.handleGuess}
            guessed={this.state.guessed}
            gameWon={this.state.gameWon}
          />
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
