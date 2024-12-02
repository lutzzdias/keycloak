import express from "express";
import swaggerUi from "swagger-ui-express";
import books from "./book/router.js";
import yaml from "yamljs";
import Keycloak from "keycloak-connect";

const app = express();
const swaggerDoc = yaml.load("swagger.yaml");
const keycloak = new Keycloak(
  {},
  {
    serverUrl: "https://tdsoft-auth.hsborges.dev",
    bearerOnly: true,
    realm: "trabalho-pratico",
  },
);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(keycloak.middleware());

app.use("/books", keycloak.protect(), books);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
