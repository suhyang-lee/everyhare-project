let token;

export async function setToken(newToken) {
  token = newToken;
}

export async function getToken() {
  return token;
}
