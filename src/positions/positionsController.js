import Position from "./positionsModel";

const getAllPositions = async (req, res, next) => {
  try {
    const positions = await Position.findAll({
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).send(positions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const addPosition = async (req, res, next) => {
  const { name, details } = req.body;
  try {
    const position = await Position.create({
      name,
      details,
    });
    res.status(200).send(position);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getAllPositions, addPosition };
