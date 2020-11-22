import { useState, useCallback } from "react";

module.exports = {
  //Input 관련 hooks
  userInput: (initValue = null) => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((e) => {
      setValue(e.target.value);
    }, []);
    return [value, handler];
  },

  //Select 관련 hooks
  userSelect: () => {
    const [value1, setValue1] = useState(true);
    const [value2, setValue2] = useState(false);
    const handler = useCallback(
      (e) => {
        if (!value1) {
          setValue1(true);
          setValue2(false);
        }
        if (!value2) {
          setValue1(false);
          setValue2(true);
        }
      },
      [value1, value2],
    );
    return [value1, value2, handler];
  },
};
