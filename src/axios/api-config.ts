import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const EndPoints = {
  heroes: "/api/heroes",
  antiHeroes: "/api/anti-heroes",
  villains: "/api/villains",
};
