class GameState {
  #players;
  #starter;
  #round;
  #roundFinished;
  #currentPlayer;
  #getNextPlayer;
  #numberOfPlayers;
  #playersLeft;
  #throws;

  constructor(players, starter) {
    this.#players = players;
    this.#starter = starter;
    this.#numberOfPlayers = players.length;
    this.#round = 0;
    this.#playersLeft = this.#numberOfPlayers;
    this.#roundFinished = false;
    this.#currentPlayer = this.validate(starter);
    this.#getNextPlayer = this.calcNextPlayer();
    this.#throws = {};
  }

  *calcNextPlayer() {
    while (true) {
      this.#currentPlayer = this.validate(this.#currentPlayer + 1);
      if (this.#currentPlayer === this.#starter) {
        this.#round++;
        this.#playersLeft = 0;
        this.#roundFinished = true;
        console.log("Next round")
      } else {
        this.#roundFinished = false;
        this.#playersLeft = this.validate(this.#playersLeft - 1);
      }
      yield this.#players[this.#currentPlayer];
    }
  }

  validate(number) {
    return (this.#numberOfPlayers + number) % this.#numberOfPlayers;
  }

  setNextPlayer() {
    console.log("Current players result:", this.currentPlayersRoundResult);
    console.log("Next player:", this.nextPlayer);
    return this.#getNextPlayer.next().value;
  }

  get currentPlayersRoundResult() {
    return this.#throws[this.currentPlayer]?.[this.#round];
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

  get players() {
    return this.#players;
  }

  addThrow(throwValue) {
    if (!this.#throws[this.currentPlayer]) {
      this.#throws[this.currentPlayer] = [];
    }

    if (!this.#throws[this.currentPlayer][this.#round]) {
      this.#throws[this.currentPlayer][this.#round] = [];
    }

    this.#throws[this.currentPlayer][this.#round].push(throwValue);

    if (this.#throws[this.currentPlayer][this.#round].length === 3) {
      this.setNextPlayer();
    }
  }

  get roundData() {
    return {
      round: this.#round,
      roundFinished: this.#roundFinished,
      currentPlayer: this.currentPlayer,
      prevPlayer: this.prevPlayer,
      nextPlayer: this.nextPlayer,
      playersLeft: this.#playersLeft,
      throws: this.#throws,
    };
  }
}

const gameState = new GameState(
  ["Lali", "Mr. Bastardo", "Sebastian", "Mafadaka"],
  2,
);

gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
// console.log(gameState.roundData);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
gameState.addThrow(20);
// console.log(gameState.roundData);