const createFieldActions = (action) => {
  const dartBoard = document.getElementById("dartboard");
  const innerBull = document.getElementById("innerBull");
  const outerBull = document.getElementById("outerBull");
  const heatMap = document.getElementById("heatMap");
  const ctx = heatMap.getContext("2d");
  const {x, y, width, height} = dartBoard.getBoundingClientRect();

  console.log(x, y, width, height);

  const hitFields = Array.from(dartBoard.getElementsByClassName("hit-field"));
  [...hitFields, innerBull, outerBull].forEach((hitField) => {
    hitField.addEventListener("click", (e) => {
      const field = hitField.getAttribute("data-value");
      const {clientX, clientY} = e;
      console.log(clientX - x, clientY - y);

      [
        {radius: 20, opacity: 0.2, color: "orange"},
        {radius: 7, opacity: 0.1, color: "orange"},
        {radius: 5, opacity: 0.1, color: "red"},
      ].forEach(({radius, opacity, color}) => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.arc(
          clientX - x + 95,
          clientY - y + 95,
          radius,
          radius,
          0,
          2 * Math.PI,
        );
        ctx.fill();
        ctx.restore();
      });

      if (action) action(field);
    });
  });
};

export default createFieldActions;
