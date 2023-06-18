class GameState {
  #players;
  #starter;
  #rounds;
  #roundFinished;
  #currentPlayer;
  #getNextPlayer;
  #numberOfPlayers;
  #playersLeft;

  constructor(players, starter) {
    this.#players = players;
    this.#starter = starter;
    this.#numberOfPlayers = players.length;
    this.#rounds = 0;
    this.#playersLeft = this.#numberOfPlayers;
    this.#roundFinished = false;
    this.#currentPlayer = this.validate(starter);
    this.#getNextPlayer = this.calcNextPlayer();
  }

  *calcNextPlayer() {
    while (true) {
      yield this.#players[this.#currentPlayer];
      this.#currentPlayer = this.validate(this.#currentPlayer + 1);
      if (this.#currentPlayer === this.#starter) {
        this.#rounds++;
        this.#playersLeft = 0
        this.#roundFinished = true;
      } else {
        this.#roundFinished = false;
        this.#playersLeft = this.validate(this.#playersLeft - 1);
      }
    }
  }

  validate(number) {
    return (this.#numberOfPlayers + number) % this.#numberOfPlayers;
  }

  setNextPlayer() {
    return this.#getNextPlayer.next().value;
  }

  get nextPlayer() {
    return this.#players[this.validate(this.#currentPlayer + 1)];
  }

  get prevPlayer() {
    return this.#players[this.validate(this.#currentPlayer - 1)];
  }

  get currentPlayer() {
    return this.#players[this.#currentPlayer];
  }

  get roundData() {
    return {
      rounds: this.#rounds,
      roundFinished: this.#roundFinished,
      currentPlayer: this.currentPlayer,
      prevPlayer: this.prevPlayer,
      nextPlayer: this.nextPlayer,
      playersLeft: this.#playersLeft
    };
  }
}

const gameState = new GameState(
  ["player1", "player2", "player3", "player4"],
  2,
);

console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
console.log(gameState.setNextPlayer());
console.log(gameState.roundData);
