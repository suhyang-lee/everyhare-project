const ServerURL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3060";

export { ServerURL };
