import fs from "fs";
import jwt from "jsonwebtoken";

import imageUploader from "../utils/imageUploader";
import Person from "../persons/personsModel";
import Applicant from "../applicants/applicantsModel";

const signup = async (req, res, next) => {
  try {
    const person = await Person.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roleId: 1,
    });
    if (req.files && req.files[0] && req.files[0].path) {
      const result = await imageUploader.upload(req.files[0].path);
      person.imageUrl = result.url;
      await person.save();
      fs.unlink(req.files[0].path, (error) => {
        if (error) {
          throw new Error("Could not delete a file", error);
        }
        console.log("Successfully deleted");
      });
    }
    const applicant = await Applicant.create({
      country: req.body.country,
      city: req.body.city,
      streetAddress: req.body.streetAddress,
      phoneNumber: req.body.phoneNumber,
      previousPositions: req.body.previousPositions,
      skype: req.body.skype,
      status: "Submitted Application",
      personId: person.dataValues.id,
      positionId: req.body.positionId,
    });
    res.sendStatus(200);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const person = await Person.findOne({
      where: { email: email },
      attributes: ["id", "imageUrl", "email"],
    });
    const token = jwt.sign(
      { email: person.email, personId: person.id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({ token, me: person });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { signup, login };
