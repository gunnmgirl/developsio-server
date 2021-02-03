import Note from "./notesModel";

const getNotes = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const count = await Note.findAndCountAll();
    const notes = await Note.findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
    });
    res.status(200).send({ notes, count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getNotes };
