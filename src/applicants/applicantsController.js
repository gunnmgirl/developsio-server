import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Position from "../positions/positionsModel";

const getAllApplicants = async (req, res, next) => {
  const order = req.query.order || "DESC";
  const { page, limit, filter } = req.query;
  const whereObj = filter ? { name: filter } : {};
  try {
    const count = await Applicant.findAndCountAll({
      include: [{ model: Position, where: whereObj }],
    });
    const applicants = await Applicant.findAll({
      attributes: ["createdAt", "phoneNumber"],
      order: [["CreatedAt", order]],
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "imageUrl", "id"],
        },
        { model: Position, attributes: ["name"], where: whereObj },
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

export default { getAllApplicants };
