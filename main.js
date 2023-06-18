import RoundHandler from "./RoundHandler.js";

const roundHandler = new RoundHandler(
  ["Lali", "Mr. Bastardo", "Sebastian", "Mafadaka"],
  2,
);

const randomThrow = () =>
  validThrowValues[Math.floor(Math.random() * validThrowValues.length)];

for (let i = 0; i < 50; i++) {
  roundHandler.addThrow(randomThrow());
}
