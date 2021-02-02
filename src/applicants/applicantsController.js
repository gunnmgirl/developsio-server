import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Position from "../positions/positionsModel";

const getAllApplicants = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const count = await Applicant.findAndCountAll();
    const applicants = await Applicant.findAll({
      attributes: ["createdAt", "phoneNumber"],
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "imageUrl", "id"],
        },
        { model: Position, attributes: ["name"] },
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
