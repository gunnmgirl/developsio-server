import Sequelize from "sequelize";
import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Position from "../positions/positionsModel";
import { STATUS } from "./applicantsConstants";

const getAllApplicants = async (req, res, next) => {
  const order = req.query.order || "DESC";
  const { page, limit, filter } = req.query;
  const wherePosition = filter ? { name: filter } : {};
  const Op = Sequelize.Op;
  try {
    const count = await Applicant.findAndCountAll({
      where: {
        status: {
          [Op.not]: STATUS.deleted,
        },
      },
      include: [{ model: Position, where: wherePosition }],
    });
    const applicants = await Applicant.findAll({
      where: {
        status: {
          [Op.not]: STATUS.deleted,
        },
      },
      attributes: ["createdAt", "phoneNumber"],
      order: [["createdAt", order]],
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "imageUrl", "id"],
        },
        { model: Position, attributes: ["name"], where: wherePosition },
      ],
    });
    res.status(200).send({ applicants, count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const deleteApplicant = async (req, res, next) => {
  const { personId } = req.body;
  try {
    const applicant = await Applicant.findByPk(personId);
    applicant.status = STATUS.deleted;
    await applicant.save();
    res.status(200).send(applicant);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getAllApplicants, deleteApplicant };
