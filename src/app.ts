import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";
import errorHandlingMiddleware from "./core/middlewares/error-handling.middleware";
import { PORT, HOST, MONGODB_URL } from "./core/config/env";
import printPretty from "digistar-hacker-faisal";
import requestLoggingMiddleware from "./core/middlewares/request-logging.middleware";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());

app.use(requestLoggingMiddleware);

app.use(routes);

app.use(errorHandlingMiddleware);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, HOST, () => {
      printPretty("debug", `Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
