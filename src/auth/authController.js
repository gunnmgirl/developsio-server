import fs from "fs";

import imageUploader from "../utils/imageUploader";
import People from "../people/peopleModel";

const signup = async (req, res, next) => {
  try {
    const result = await imageUploader.upload(req.files[0].path);
    const person = await People.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      jobPosition: req.body.jobPosition,
      country: req.body.country,
      city: req.body.city,
      streetAddress: req.body.streetAddress,
      phoneNumber: req.body.phoneNumber,
      skype: req.body.skype,
      previousPositions: req.body.previousPositions,
      imageUrl: result.url,
    });
    fs.unlink(req.files[0].path, (error) => {
      if (error) {
        throw new Error("Could not delete a file", error);
      }
      console.log("successfully deleted");
    });
    res.sendStatus(200);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { signup };
