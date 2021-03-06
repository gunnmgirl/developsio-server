import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./auth/authRoutes";
import positionsRoutes from "./positions/positionsRoutes";
import personsRoutes from "./persons/personsRoutes";
import applicantsRoutes from "./applicants/applicantsRoutes";
import notesRoutes from "./notes/notesRoutes";
import statusesRoutes from "./statuses/statusesRoutes";
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/position", positionsRoutes);
app.use("/person", personsRoutes);
app.use("/applicant", applicantsRoutes);
app.use("/note", notesRoutes);
app.use("/status", statusesRoutes);

app.use((error, req, res, next) => {
  console.log("In error middleware", error);
  res.status(error.statusCode).send(error.message);
});

app.listen(port, () => console.log(`Running on port ${port}`));
