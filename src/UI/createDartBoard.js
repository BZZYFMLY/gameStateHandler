import arcOrder from "../Constants/arcOrder.js";
import arcTypes from "../Constants/arcTypes.js";

const createDartBoard = () => {
  console.log("Creating dart board...");

  const dartBoard = document.getElementById("dartboard");
  const arcs = dartBoard.getElementsByTagName("arcs");

  const arcTemplate = (value, index) => {
    const even = index % 2 === 0;

    const arcParts = arcTypes
      .map(
        ({pre, name}) =>
          `<use id="${pre + value}" class="hit-field ${name}-field ${
            pre === "O" || pre === "I"
              ? even
                ? "black"
                : "white"
              : even
              ? "red"
              : "green"
          }" xlink:href="#${name}" height="500" width="500" y="0" x="0" data-value="${
            pre + value
          }"/>`,
      )
      .join("");

    return `<g id="A${value}" class="arc" transform="rotate(${
      index * 18
    })">${arcParts}</g>`;
  };

  const boardArcs = arcOrder
    .map((value, index) => {
      return arcTemplate(value, index);
    })
    .join("");

  // console.log(boardArcs);
};

export default createDartBoard;
