import arcOrder from "./arcOrder.js";
import arcTypes from "./arcTypes.js";

const getValidThrowValues = () =>
  arcOrder.map((value) => arcTypes.map((type) => `${type.pre}${value}`)).flat();

export default getValidThrowValues;
