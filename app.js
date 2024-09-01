require("dotenv").config();
const queries = require("./db/queries");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const messages = await queries.getAllMessages();
  res.render("index", {
    messages: messages.map((v) => ({
      user: v.username,
      text: v.text,
      added: v.added,
      id: v.id,
    })),
  });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", async (req, res) => {
  await queries.addMessage(req.body.user, req.body.text);
  res.redirect("/");
});

app.get("/messages/:id", async (req, res) => {
  const message = await queries.getMessage(req.params.id);
  console.log(message);
  res.render("message", {
    message: {
      user: message.username,
      text: message.text,
      added: message.added,
    },
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
