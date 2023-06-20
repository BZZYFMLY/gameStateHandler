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
    const currentThrows = this.roundHandler.currentPlayerThrows;
    const round = this.roundHandler.round;
    this.throws.innerHTML =
      currentThrows?.length > round ? currentThrows[round].join(", ") : "-";
  }

  updateGameData() {
    this.playerNameUpdate();
    this.roundUpdate();
    this.throwsUpdate();
  }

  drawHit = ({x, y}) => {
    console.log(x, y);
    [
      {radius: 20, opacity: 0.2, color: "#ff9933"},
      {radius: 7, opacity: 0.02, color: "orange"},
      {radius: 3, opacity: 0.5, color: "red"},
    ].forEach(({radius, opacity, color}) => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.save();
      this.ctx.filter = "blur(4px)";
      this.ctx.globalAlpha = opacity;
      this.ctx.arc(x, y, radius, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.restore();
    });
  };

  clearHeatMap = () => {
    this.ctx.clearRect(0, 0, this.heatMap.width, this.heatMap.height);
  };

  showHeatMap = () => {
    this.heatMap.classList.remove("hidden");
  };
  hideHeatMap = () => {
    this.heatMap.classList.add("hidden");
  };

  createFieldActions = () => {
    [...this.hitFields, this.innerBull, this.outerBull].forEach((hitField) => {
      hitField.addEventListener("click", (e) => {
        const fieldName = hitField.getAttribute("data-value");
        const {x, y} = this.dartBoard.getBoundingClientRect();
        const {clientX, clientY} = e;

        const coords = {x: clientX - x + 95, y: clientY - y + 95};

        this.drawHit(coords);
        this.roundHandler.addThrow(fieldName, coords);
        this.updateGameData();
      });
    });
  };
}

export default UIHandler;
