const createFieldActions = () => {
  const dartBoard = document.getElementById("dartboard");
  const innerBull = document.getElementById("innerBull");
  const outerBull = document.getElementById("outerBull");

  const hitFields = Array.from(dartBoard.getElementsByClassName("hit-field"));
  [...hitFields, innerBull, outerBull].forEach((hitField) => {
    hitField.addEventListener("click", () => {
      console.log(hitField.getAttribute("data-value"));
    });
  });
};

export default createFieldActions;
