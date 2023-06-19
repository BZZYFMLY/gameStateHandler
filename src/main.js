import RoundHandler from "./RoundHandler/RoundHandler.js";
import getValidThrowValues from "./Constants/getValidThrowValues.js";
import createFieldActions from "./UI/createFieldActions.js";


const roundHandler = new RoundHandler(
  ["Lali", "Mr. Bastardo", "Sebastian", "Mafadaka"],
  2,
);

createFieldActions(roundHandler.addThrow.bind(roundHandler));

const validThrowValues = getValidThrowValues();
console.log(validThrowValues);

// const randomThrow = () =>
//   validThrowValues[Math.floor(Math.random() * validThrowValues.length)];

// for (let i = 0; i < 50; i++) {
//   roundHandler.addThrow(randomThrow());
// }
