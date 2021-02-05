import Note from "./notesModel";

const getNotes = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const count = await Note.findAndCountAll();
    const notes = await Note.findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      order: [["CreatedAt", "DESC"]],
    });
    res.status(200).send({ notes, count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const addNote = async (req, res, next) => {
  const { title, body, isPrivate } = req.body;
  try {
    const note = await Note.create({
      title,
      body,
      isPrivate,
      personId: req.userId,
    });
    res.status(200).send(note);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getNotes, addNote };
