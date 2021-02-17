import fs from "fs";

import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Status from "../statuses/statusesModel";
import Position from "../positions/positionsModel";
import { STATUSES } from "../statuses/statusesConstants";
import imageUploader from "../utils/imageUploader";

const getAllApplicants = async (req, res, next) => {
  const order = req.query.order || "DESC";
  const { page, limit, filter, statusId } = req.query;
  const wherePosition = filter ? { name: filter } : {};
  const whereStatus = statusId ? { id: statusId } : {};

  try {
    const count = await Applicant.findAndCountAll({
      include: [
        { model: Position, where: wherePosition },
        { model: Status, where: whereStatus },
      ],
    });
    const applicants = await Applicant.findAll({
      attributes: ["createdAt", "phoneNumber"],
      order: [["createdAt", order]],
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      include: [
        { model: Status, attributes: ["name"], where: whereStatus },
        {
          model: Person,
          attributes: ["firstName", "lastName", "imageUrl", "id"],
        },
        { model: Position, attributes: ["name"], where: wherePosition },
      ],
    });
    res.status(200).send({ applicants, count: count.count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getApplicant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const applicant = await Applicant.findOne({
      personId: id,
      include: [
        { model: Status, attributes: ["name"] },
        {
          model: Person,
        },
        { model: Position, attributes: ["name"] },
      ],
      where: { personId: id },
    });
    res.status(200).send(applicant);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const deleteApplicant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const applicant = await Applicant.findByPk(id);
    applicant.statusId = STATUSES.deleted.id;
    await applicant.save();
    res.status(200).send({ status: STATUSES.deleted });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const restoreApplicant = async (req, res, next) => {
  const { personId } = req.body;
  try {
    const applicant = await Applicant.findByPk(personId);
    applicant.statusId = STATUSES.submittedApplicantion.id;
    await applicant.save();
    res.status(200).send({ status: STATUSES.submittedApplicantion });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const changeApplicantStatus = async (req, res, next) => {
  const { statusId, personId } = req.body;
  try {
    const applicant = await Applicant.findByPk(personId);
    applicant.statusId = statusId;
    await applicant.save();
    res.status(200).send({});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const uploadApplicantImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(req.files && req.files.length && req.files[0] && req.files[0].path)) {
      const error = new Error("No file to upload");
      error.statusCode = 400;
      throw error;
    }
    const result = await imageUploader.upload(req.files[0].path);
    await Person.update(
      { imageUrl: result.url },
      {
        where: {
          id: id,
        },
      }
    );
    fs.unlink(req.files[0].path, (error) => {
      if (error) {
        throw new Error("Could not delete a file", error);
      }
      console.log("Successfully deleted");
    });
    res.status(200).send(result.url);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  getAllApplicants,
  deleteApplicant,
  restoreApplicant,
  getApplicant,
  changeApplicantStatus,
  uploadApplicantImage,
};
