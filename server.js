import express from "express";
import swaggerUi from "swagger-ui-express";
import books from "./book/router.js";
import yaml from "yamljs";

const app = express();
const swaggerDoc = yaml.load("swagger.yaml");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());

const authenticate = (req, _, next) => {
  console.log(req.headers.authorization);
  next();
};

app.use("/books", authenticate, books);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
