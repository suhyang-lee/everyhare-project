import produce, { enableES5 } from "immer";

const produces = (...args) => {
  enableES5();
  return produce(...args);
};

export default produces;
