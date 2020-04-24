const express = require("express");
const accountRouter = require("./accounts/accountRouter");
const cors = require("cors");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api", accountRouter);

module.exports = server;
