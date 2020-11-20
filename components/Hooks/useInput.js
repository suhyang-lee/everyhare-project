import { useState, useCallback } from "react";

const userInput = (initValue = null) => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
export default userInput;
