import Applicant from "./applicantsModel";

const LIMIT = 8;

const getAllApplicants = async (req, res, next) => {
  const { page } = req.params;
  try {
    const applicants = await Applicant.findAll({
      limit: LIMIT,
      offset: Number(page) * LIMIT,
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
