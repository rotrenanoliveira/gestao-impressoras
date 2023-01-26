import express from "express";
import cors from "cors";

import { apiRoutes } from "./api/routes.js";

const SERVER_PORT = 80;
// files path
const appPath = new URL("../dist/", import.meta.url);
const appHMTLPath = new URL("../dist/index.html", import.meta.url);

//=
const app = express();
// middlewares
app.use(cors());
app.use(express.static(appPath.pathname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle requests to /api route
app.use("/api/v1", apiRoutes);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(appHMTLPath.pathname);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running`);
});
