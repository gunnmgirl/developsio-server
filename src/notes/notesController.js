import Note from "./notesModel";

const getNotes = async (req, res, next) => {
  const { page, limit, filter } = req.query;
  const order = req.query.order || "DESC";
  const whereObj = filter ? { personId: req.userId } : { isPrivate: 0 };
  try {
    const count = await Note.findAndCountAll();
    const notes = await Note.findAll({
      where: whereObj,
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      order: [["updatedAt", order]],
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
