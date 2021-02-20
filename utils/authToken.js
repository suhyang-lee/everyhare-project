const authToken = () => {
  let token = null;

  return {
    setToken: (tokens) => {
      token = tokens;
      return true;
    },
    getToken: () => token,
    removeToken: () => {
      token = null;
      return true;
    },
  };
};

const authTokenClosure = authToken();
export { authTokenClosure };
