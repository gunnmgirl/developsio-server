import Status from "./statusesModel";

const getStatuses = async (req, res, next) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).send(statuses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getStatuses };
