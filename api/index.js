const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}

));

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000);
