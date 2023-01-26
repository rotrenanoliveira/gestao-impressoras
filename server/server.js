import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";

import { apiRoutes } from "./api/routes.js";

const SERVER_PORT = 80;
// files path
const appPath = fileURLToPath(new URL("../dist/", import.meta.url));
const appHTMLPath = fileURLToPath(new URL("../dist/index.html", import.meta.url));

//=
const app = express();
// middlewares
app.use(cors());
app.use(express.static(appPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle requests to /api route
app.use("/api/v1", apiRoutes);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(appHTMLPath);
});

app.listen(SERVER_PORT, () => {
  console.log(`
- PRINTER ink_ v1.0.0

  APP: http://localhost
  `);
});
