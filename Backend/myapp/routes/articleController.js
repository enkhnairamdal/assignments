const express = require("express");
const { v4: uuid } = require("uuid");

const { connection } = require("../config/mysql");
const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    `select article.id, title, category.name as categoryName from article left join category on article.category_id = category.id`,
    function (err, results, fields) {
      console.log({ err });
      res.json({
        list: results,
        count: 10,
      });
    }
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query(
    `select * from article where id=?`,
    [id],
    function (err, results, fields) {
      res.json(results[0]);
    }
  );
});
router.post("/", (req, res) => {
  const { title, categoryId, content } = req.body;
  const newArticle = {
    id: uuid(),
    title,
    content,
    category_id: categoryId,
    name,
    newsPhoto,
  };
  console.log(newArticle);
  connection.query(
    `insert into article  values (?,?,?,?)`,
    [
      newArticle.id,
      newArticle.title,
      newArticle.content,
      newArticle.category_id,
      // newArticle.name,
      // newArticle.newsPhoto,
    ],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `delete from article where id=?`,
    [id],
    function (err, results, fields) {
      res.json({ deletedId: id });
    }
  );
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;
  connection.query(
    `update article set ? where id=? `,
    [{ title, content, category_id: categoryId }, id],
    function (err, results, fields) {
      res.json({ updated: id });
    }
  );
});

module.exports = {
  articleRouter: router,
};
