import RoundHandler from "./RoundHandler/RoundHandler.js";
import UIHandler from "./UI/UIHandler.js";


const roundHandler = new RoundHandler(
  ["Lali", "Mr. Bastardo", "Sebastian", "Mafadaka"],
  2,
  );

const ui = new UIHandler(roundHandler);

// const validThrowValues = getValidThrowValues();
// console.log(validThrowValues);

// const randomThrow = () =>
//   validThrowValues[Math.floor(Math.random() * validThrowValues.length)];

// for (let i = 0; i < 50; i++) {
//   roundHandler.addThrow(randomThrow());
// }
