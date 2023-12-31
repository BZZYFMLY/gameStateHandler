import getValidThrowValues from "../Constants/getValidThrowValues.js";

class RoundHandler {
  #players;
  #starter;
  #round;
  #roundFinished;
  #currentPlayerIndex;
  #getNextPlayer;
  #numberOfPlayers;
  #playersLeft;
  #throws;
  #validThrows;

  constructor(players, starter) {
    this.#players = players;
    this.#numberOfPlayers = players.length;
    this.#starter = this.getStarter(starter);

    this.#round = 0;
    this.#playersLeft = this.#numberOfPlayers;
    this.#roundFinished = false;
    this.#currentPlayerIndex = this.validate(starter);
    this.#getNextPlayer = this.calcNextPlayer();
    this.#throws = {};
    this.#validThrows = getValidThrowValues();
  }

  getStarter(starter) {
    if (typeof starter === "number" && starter < this.#numberOfPlayers)
      return starter;

    if (typeof starter === "string" && this.#players.includes(starter))
      return this.players.indexOf(starter);

    console.error("No starter found!");
    return 0;
  }

  *calcNextPlayer() {
    while (true) {
      console.log(
        `Player ${
          this.currentPlayer
        } finished his/her turn with results: ${this.currentPlayersRoundResult.join(
          ", ",
        )}`,
      );
      console.log("Next player:", this.nextPlayer, "round:", this.#round);

      this.#currentPlayerIndex = this.validate(this.#currentPlayerIndex + 1);

      if (this.#currentPlayerIndex === this.#starter) {
        this.#round++;
        this.#playersLeft = 0;
        this.#roundFinished = true;
        console.log("Next round:", this.#round);
      } else {
        this.#roundFinished = false;
        this.#playersLeft = this.validate(this.#playersLeft - 1);
      }
      yield this.#players[this.#currentPlayerIndex];
    }
  }

  validate(number) {
    return (this.#numberOfPlayers + number) % this.#numberOfPlayers;
  }

  setNextPlayer() {
    return this.#getNextPlayer.next().value;
  }

  get currentPlayersRoundResult() {
    return this.#throws[this.currentPlayer]?.[this.#round];
  }

  get nextPlayer() {
    return this.#players[this.validate(this.#currentPlayerIndex + 1)];
  }

  get prevPlayer() {
    return this.#players[this.validate(this.#currentPlayerIndex - 1)];
  }

  get currentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  get players() {
    return this.#players;
  }

  get round() {
    return this.#round;
  }

  removePlayer(player) {
    if (typeof player === "number" && player < this.#numberOfPlayers)
      return this.#players.splice(player, 1);
    if (typeof player === "string" && this.#players.includes(player))
      return this.#players.filter((p) => p !== player);
    return "No player found!";
  }

  get currentPlayerThrows() {
    return this.#throws[this.currentPlayer];
  }

  addThrow(throwValue) {
    const checkedThrow = "" + throwValue;
    if (!this.#validThrows.includes(checkedThrow)) {
      console.error(`Invalid throw value!`);
    }
    if (!this.#throws[this.currentPlayer]) {
      this.#throws[this.currentPlayer] = [];
    }

    if (!this.#throws[this.currentPlayer][this.#round]) {
      this.#throws[this.currentPlayer][this.#round] = [];
    }

    this.#throws[this.currentPlayer][this.#round].push(checkedThrow);
    console.log(`Player ${this.currentPlayer} thrown: ${throwValue}`);

    if (this.#throws[this.currentPlayer][this.#round].length === 3) {
      this.setNextPlayer();
    }
  }
  scoreCorrection(round, player, newValue) {
    const playerName =
      typeof player === "number" ? this.#players[player] : player;

    if (this.#throws[playerName]?.[round]) {
      this.#throws[playerName][round] = newValue;
    } else
      console.error(`No throws found for ${playerName} in round ${round}!`);
  }

  get gameState() {
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

export default RoundHandler;
