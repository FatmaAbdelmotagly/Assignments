import { Router } from "express";
import {
  aggregate4,
  aggregate3,
  aggregate2,
  aggregate1,
  deleteBooksBeforeYear,
  excludeGenres,
  findBooksWithIntegerYear,
  skipLimitBooks,
  findBooksBycategory,
  getBook,
  getBookByYear,
  createBooksCollection,
  createCappedCollection,
  createBooksIndex,
  insertDocument,
  insertManyDocument,
  updateBook,
} from "./bookService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();
//1
router.post("/books", async (req, res) => {
  await createBooksCollection();
  successResponse({ message: "ok", status: 201, res });
});
//3
router.post("/logs/capped", async (req, res) => {
  await createCappedCollection();
  successResponse({ message: "ok", status: 201, res });
});
//4
router.post("/books/index", async (req, res) => {
  await createBooksIndex();
  successResponse({ message: "index created", status: 201, res });
});
//5
router.post("/", async (req, res) => {
  const doc = await insertDocument(req.body);
  console.log(doc.insertedId);

  successResponse({ message: "documnt created", status: 201, res, data: doc });
});
//6
router.post("/batch", async (req, res) => {
  const doc = await insertManyDocument(req.body);
  successResponse({ status: 201, res, data: doc });
});

router.patch("/Future", async (req, res, next) => {
  const log = await updateBook();
  successResponse({ status: 201, data: log, res });
});

router.get("/title", async (req, res, next) => {
  const book = await getBook(req.query.title);
  successResponse({ status: 200, data: book, res });
});
router.get("/year", async (req, res, next) => {
  const books = await getBookByYear(req.query);
  successResponse({ status: 200, data: books, res });
});

router.get("/category", async (req, res, next) => {
  const books = await findBooksBycategory(req.query);
  successResponse({ status: 200, data: books, res });
});
router.get("/skip-limit", async (req, res, next) => {
  const books = await skipLimitBooks();
  successResponse({ status: 200, data: books, res });
});
router.get("/year-integer", async (req, res, next) => {
  const books = await findBooksWithIntegerYear();
  successResponse({ status: 200, data: books, res });
});

router.get("/exclude-genres", async (req, res, next) => {
  const books = await excludeGenres();
  successResponse({ status: 200, data: books, res });
});

router.delete("/beforeYear", async (req, res, next) => {
  await deleteBooksBeforeYear(req.query.year);

  successResponse({ status: 200, res });
});

router.get("/aggregate1", async (req, res, next) => {
  const books = await aggregate1();

  successResponse({ status: 200, data: books, res });
});

router.get("/aggregate2", async (req, res, next) => {
  const books = await aggregate2();

  successResponse({ status: 200, data: books, res });
});
router.get("/aggregate3", async (req, res, next) => {
  const books = await aggregate3();
  successResponse({ status: 200, data: books, res });
});

router.get("/aggregate4", async (req, res, next) => {
  const books = await aggregate4();
  successResponse({ status: 200, data: books, res });
});

export default router;
