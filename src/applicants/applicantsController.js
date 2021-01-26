import Applicant from "./applicantsModel";
import Person from "../persons/personsModel";
import Position from "../positions/positionsModel";
import { LIMIT_APPLICANTS } from "../constants/paginationConstants";

const getAllApplicants = async (req, res, next) => {
  const { page } = req.params;
  try {
    const applicants = await Applicant.findAll({
      attributes: ["createdAt", "phoneNumber"],
      limit: LIMIT_APPLICANTS,
      offset: parseInt(page, 10) * LIMIT_APPLICANTS,
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "imageUrl", "id"],
        },
        { model: Position, attributes: ["name"] },
      ],
    });
    res.status(200).send(applicants);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getAllApplicants };
