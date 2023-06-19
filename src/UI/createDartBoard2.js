import arcOrder from "../Constants/arcOrder";
import arcTypes from "../Constants/arcTypes";

const createDartBoard2 = () => {
  const arcs = document.getElementById("arcs");

  arcOrder.forEach((value, index) => {
    const arcElement = createArc(value, index);
    console.log(arcElement);
    arcTypes.forEach((type) => {
      const arcPartElement = createArcPart(value, type, index);
      arcElement.appendChild(arcPartElement);
    });
    arcs.appendChild(arcElement);
  });
};

const createArc = (value, index) => {
  const arcElement = document.createElement("g");
  arcElement.id = `A${value}`;
  arcElement.classList.add("arc");
  arcElement.setAttribute("transform", `rotate(${index * 18})`);
  return arcElement;
};

const createArcPart = (value, type, index) => {
  const {pre, name} = type;

  const even = index % 2 === 0;
  const color =
    pre === "O" || pre === "I"
      ? even
        ? "black"
        : "white"
      : even
      ? "red"
      : "green";

  const arcPartElement = document.createElement("use");
  arcPartElement.id = `${pre + value}`;
  arcPartElement.classList.add(name + "-field");
  arcPartElement.classList.add("hit-field");
  arcPartElement.classList.add(color);
  arcPartElement.setAttribute("xlink:href", `#${name}`);
  arcPartElement.setAttribute("height", "500");
  arcPartElement.setAttribute("width", "500");
  arcPartElement.setAttribute("y", "0");
  arcPartElement.setAttribute("x", "0");
  arcPartElement.setAttribute("data-value", `${pre + value}`);
  arcPartElement.setAttribute("onClick", `console.log('${pre + value}')`);
  return arcPartElement;
};

export default createDartBoard2;
