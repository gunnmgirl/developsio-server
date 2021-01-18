import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./auth/authRoutes";
import positionsRoutes from "./positions/positionsRoutes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/position", positionsRoutes);

app.use((error, req, res, next) => {
  console.log("In error middleware", error);
  res.status(error.statusCode).send(error.message);
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
