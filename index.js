const express = require("express");
const server = express();
const pdfRoute = require("./pdfRoute");
const logger = require("morgan");
const cors = require("cors");

server.use(logger("dev"));
server.use(express.json());
server.use(cors());

const port = 9000;

server.use("/api", pdfRoute);

server.get("/", (req, res) => {
  res.send("it works");
});

server.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
