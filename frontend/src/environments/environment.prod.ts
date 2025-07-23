import * as conf from "./config.json";

export const environment = {
  ...conf,
  production: true,
  serverURL: "http://localhost:56879"
};
