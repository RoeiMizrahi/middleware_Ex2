const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const currentDate = new Date().toLocaleString();
  console.log(`[${currentDate}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("ברוכים הבאים לדף הבית!");
});

const Permissions = (req, res, next) => {
  const user = req.query.user;
  if (user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next();
};

app.get("/admin", Permissions, (req, res) => {
  res.send("ברוכים הבאים לעמוד הניהול!");
});

app.get("/public", (req, res) => {
  res.send("זהו דף ציבורי.");
});

app.listen(port, () => {
  console.log(`http://localhost:${PORT}`);
});
