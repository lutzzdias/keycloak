import express from "express";
import books from "./book/router.js";
const app = express();

app.use(express.json());

const authenticate = (req, res, next) => {
  console.log(req.headers.authorization);
  next();
};

app.use("/books", authenticate, books);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
