import { Router } from "express";

const db = new Map();

const router = Router();

// Get all
router.get("/", function (req, res) {
  const books = Array.from(db.values());
  return res.status(200).json(books);
});

// Get by id
router.get("/:id", function (req, res) {
  const { id } = req.params;
  const book = db.get(id);
  return book ? res.status(200).json(book) : res.sendStatus(404);
});

// Create
router.post("/", function (req, res) {
  const { title, author, finished } = req.body;

  const id = db.size + 1;
  const book = {
    id,
    title,
    author,
    finished: finished !== undefined ? finished : false,
    createdAt: new Date(),
  };

  db.set(id, book);
  return res.status(201).json(book);
});

// Update
router.put("/:id", function (req, res) {
  const { id } = req.params;
  const book = db.get(id);

  if (!book) return res.sendStatus(404);

  const { title, author, finished } = req.body;

  const updated = {
    ...book,
    title: title !== undefined ? title : book.title,
    author: author !== undefined ? author : book.author,
    finished: finished !== undefined ? finished : book.finished,
  };

  db.set(id, updated);
  return res.sendStatus(204);
});

// Delete
router.delete("/:id", function (req, res) {
  const { id } = req.params;

  if (!db.has(id)) return res.sendStatus(404);

  db.delete(id);
  return res.sendStatus(204);
});

export default router;
