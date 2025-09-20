import http from "./http";
export const api = {
  login: (data) => http.post("/auth/login", data),
  register: (data) => http.post("/auth/register", data),
  me: () => http.get("/auth/me"),
  // ...courses, quiz, payments, etc. will go here
};
