import Note from "./notesModel";
import Person from "../persons/personsModel";

const getNotes = async (req, res, next) => {
  const { page, limit, filter } = req.query;
  const order = req.query.order || "DESC";
  const whereObj = filter
    ? { personId: req.userId, isPrivate: filter }
    : { isPrivate: 0 };
  try {
    const count = await Note.findAndCountAll({ where: whereObj });
    const notes = await Note.findAll({
      where: whereObj,
      limit: parseInt(limit, 10),
      offset: parseInt(page, 10) * parseInt(limit, 10),
      order: [["updatedAt", order]],
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName"],
        },
      ],
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

    const person = await Person.findByPk(req.userId);
    note.dataValues.person = {
      firstName: person.dataValues.firstName,
      lastName: person.dataValues.lastName,
    };
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const editNote = async (req, res, next) => {
  const { title, body, isPrivate, noteId } = req.body;
  try {
    const note = await Note.findByPk(noteId);
    if (req.userId !== note.personId) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    note.title = title;
    note.body = body;
    note.isPrivate = isPrivate;
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (req.userId !== note.personId) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    await note.destroy();
    res.status(200).send({});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default { getNotes, addNote, editNote, deleteNote };
