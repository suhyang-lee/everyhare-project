const authToken = function () {
  let token = "";

  function updateToken(newToken) {
    token = newToken;
  }

  function sendToken() {
    console.log("ttttttt", token);
    return token;
  }

  return {
    setToken: function (tokens) {
      updateToken(tokens);
    },
    getToken: function () {
      return sendToken();
    },
  };
};
const authTokenClosure = authToken();

export { authTokenClosure };
