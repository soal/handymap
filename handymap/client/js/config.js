export const API_ROOT = (process.env.NODE_ENV === "production")
      ? "https://handymap.com/api"
      : "http://localhost:5000/api";