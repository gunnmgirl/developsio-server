import Position from "./positionsModel";

const getAllPositions = async (req, res, next) => {
  try {
    const positions = await Position.findAll();
    res.status(200).send(positions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getAllPositions };
