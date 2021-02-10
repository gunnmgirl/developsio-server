import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Status from "../statuses/statusesModel";
import Position from "../positions/positionsModel";

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

const deleteApplicant = async (req, res, next) => {
  const { personId } = req.body;
  try {
    const applicant = await Applicant.findByPk(personId);
    const status = await Status.findByPk(51);
    applicant.statusId = status.id;
    await applicant.save();
    res.status(200).send({ status });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getAllApplicants, deleteApplicant };
