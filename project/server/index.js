require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5433",
};
const routes = require("./routes/index.js");

app.use(cors(corsOptions));
app.use(bodyparser.json({ limit: "200mb" }));

app.use(bodyparser.urlencoded({ limit: "200mb", extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/", routes);

app.listen(port, () => {
  console.log(`L'application est lancée sur : http://localhost:${port}`);
});
