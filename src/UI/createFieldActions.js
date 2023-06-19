class UIHandler {
  constructor(roundHandler) {
    this.dartBoard = document.getElementById("dartboard");
    this.innerBull = document.getElementById("innerBull");
    this.outerBull = document.getElementById("outerBull");
    this.heatMap = document.getElementById("heatMap");
    this.ctx = heatMap.getContext("2d");
    this.roundHandler = roundHandler;
    this.hitFields = Array.from(
      this.dartBoard.getElementsByClassName("hit-field"),
    );
    this.playerName = document.getElementById("playerName");
    this.round = document.getElementById("round");
    this.throws = document.getElementById("throws");

    this.updateGameData();
    this.createFieldActions();
  }

  playerNameUpdate() {
    this.playerName.innerHTML = this.roundHandler.currentPlayer;
  }

  roundUpdate() {
    this.round.innerHTML = this.roundHandler.round + 1;
  }

  throwsUpdate() {
    this.throws.innerHTML =
      this.roundHandler.currentPlayerThrows?.join(", ") ?? "";
  }

  updateGameData() {
    this.playerNameUpdate();
    this.roundUpdate();
    this.throwsUpdate();
  }

  createFieldActions = () => {
    [...this.hitFields, this.innerBull, this.outerBull].forEach((hitField) => {
      hitField.addEventListener("click", (e) => {
        const fieldName = hitField.getAttribute("data-value");

        const {x, y, width, height} = this.dartBoard.getBoundingClientRect();

        const {clientX, clientY} = e;
        console.log(clientX - x, clientY - y);

        [
          {radius: 20, opacity: 0.2, color: "orange"},
          {radius: 7, opacity: 0.01, color: "orange"},
          {radius: 5, opacity: 0.01, color: "red"},
        ].forEach(({radius, opacity, color}) => {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.fillStyle = color;
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.arc(
            clientX - x + 95,
            clientY - y + 95,
            radius,
            radius,
            0,
            2 * Math.PI,
          );
          this.ctx.fill();
          this.ctx.restore();
        });

        this.roundHandler.addThrow(fieldName);
        this.updateGameData();
      });
    });
  };
}

export default UIHandler;
