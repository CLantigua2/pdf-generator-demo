const express = require("express");
const server = express();
const pdfRoute = require("./pdfRoute");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

server.use(logger("dev"));
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 9000;

server.use("/api", pdfRoute);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
  server.get("/*", (req, res) => {
    const index = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(index);
  });
}

server.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
