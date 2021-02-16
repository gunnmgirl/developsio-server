import fs from "fs";

import Person from "../persons/personsModel";
import imageUploader from "../utils/imageUploader";

const getPerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.userId !== parseInt(id)) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const person = await Person.findOne({
      attributes: ["firstName", "lastName", "id", "imageUrl", "email"],
      where: { id: id },
    });
    res.status(200).send(person);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const editPerson = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const person = await Person.findOne({
      attributes: ["firstName", "lastName", "id", "imageUrl", "email"],
      where: { id: id },
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
    person.firstName = firstName;
    person.lastName = lastName;
    await person.save();
    res.status(200).send(person);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  getPerson,
  editPerson,
};
