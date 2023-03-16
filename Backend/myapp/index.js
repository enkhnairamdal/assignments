const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
// const axios = require("axios");
// const hash = bcrypt.hashSync("12345678");
// console.log({ hash });
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "blog",
});
const user = {
  username: "Nairamdal",
  password: "$2a$10$08nkK2ZVcPRPYYrWglbz4eors3gi6WcVQTV3SRTnAvAB7NL9nEmg2",
};
// let userTokens = [];
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

function readCategories() {
  const content = fs.readFileSync("categories.json");
  const categories = JSON.parse(content);
  return categories;
}
function readArticles() {
  const content = fs.readFileSync("articles.json");
  const articles = JSON.parse(content);
  return articles;
}
function readTokens() {
  const content = fs.readFileSync("saveTokens.json");
  const userTokens = JSON.parse(content);
  return userTokens;
}
app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (
    user.username === username &&
    bcrypt.compareSync(password, user.password)
  ) {
    const userTokens = readTokens();
    const token = uuid();
    userTokens.push(token);
    res.json({ token });
    fs.writeFileSync("saveTokens.json", JSON.stringify(userTokens));
  } else {
    res.sendStatus(401);
  }
});
app.get("/mysql-test", (req, res) => {
  const limit = 10;
  connection.query(
    `select * from category limit ${limit}`,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.get("/categories", (req, res) => {
  connection.query(`select * from category`, function (err, results, fields) {
    res.json(results);
  });
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  // const categories = readCategories();
  // const one = categories.find((category) => category.id === id);

  // if (one) {
  //   res.json(one);
  // } else {
  //   res.sendStatus(404);
  // }
  connection.query(
    `SELECT * FROM category where id=?`,
    [id],
    function (err, results, fields) {
      res.json(results[0]);
    }
  );
});

app.post("/categories", (req, res) => {
  const { name } = req.body;
  // const newCategory = { id: uuid(), name: name };

  // const categories = readCategories();

  // categories.unshift(newCategory);
  // fs.writeFileSync("categories.json", JSON.stringify(categories));

  // res.sendStatus(201);
  connection.query(
    `insert into category values(? ,?)`,
    [uuid(), name],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );
});

app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  // const categories = readCategories();
  // const one = categories.find((category) => category.id === id);
  // if (one) {
  //   const newList = categories.filter((category) => category.id !== id);
  //   fs.writeFileSync("categories.json", JSON.stringify(newList));
  //   res.json({ deletedId: id });
  // } else {
  //   res.sendStatus(404);
  // }
  connection.query(
    `delete from category where id=?`,
    [id],
    function (err, results, fields) {
      res.json({ deletedId: id });
    }
  );
});

app.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // const categories = readCategories();
  // const index = categories.findIndex((category) => category.id === id);
  // if (index > -1) {
  //   categories[index].name = name;
  //   fs.writeFileSync("categories.json", JSON.stringify(categories));
  //   res.json({ updatedId: id });
  // } else {
  //   res.sendStatus(404);
  // }
  connection.query(
    `update category set name=? where id=?`,
    [name, id],
    function (err, results, fields) {
      res.json({ updateId: id });
    }
  );
});

app.get("/users/save", (req, res) => {
  const newUser = [
    {
      name: "Sarnai",
      id: 1,
    },
  ];
  fs.writeFileSync("data.json", JSON.stringify(newUser));
  res.json(["success"]);
});

app.get("/users/read", (req, res) => {
  const content = fs.readFileSync("data.json");
  res.json(JSON.parse(content));
});

app.get("/users/update", (req, res) => {
  const content = fs.readFileSync("data.json");
  const users = JSON.parse(content);
  users.push({ id: 2, name: "Bold" });
  fs.writeFileSync("data.json", JSON.stringify(users));
  res.json({});
});

// app.get("/articles", (req, res) => {
//   const { q } = req.query;

//   const articles = readArticles();
//   if (q) {
//     const filteredList = articles.filter((articles) =>
//       articles.title.toLowerCase().includes(q.toLowerCase())
//     );
//     res.json(filteredList);
//   } else {
//     res.json({
//       list: filteredList,
//       count: filteredList.length,
//     });
//   }
// });

app.get("/articles", (req, res) => {
  console.log(req.query);
  const { q, page: paget } = req.query;
  console.log("sdf", paget);
  const page = paget ? paget : 1;
  const articles = readArticles();
  if (q) {
    console.log("q");
    const filteredList = articles.filter((article) =>
      article.title.toLowerCase().includes(q.toLowerCase())
    );
    res.json({
      list: filteredList,
      count: filteredList.length,
    });
  } else {
    console.log("blank backend");
    console.log("page", page);
    const pagedList = articles.slice((page - 1) * 10, page * 10);
    console.log(pagedList.length);
    console.log("art.list" + articles.length);
    res.json({
      list: pagedList,
      count: articles.length,
    });
  }
});

app.post("/articles", (req, res) => {
  const { title, categoryId, text, ner, ImgAddress, newsPhoto } = req.body;
  const newArticle = {
    id: uuid(),
    title,
    categoryId,
    text,
    ner,
    ImgAddress,
    newsPhoto,
  };

  const articles = readArticles();

  articles.unshift(newArticle);
  fs.writeFileSync("articles.json", JSON.stringify(articles));

  res.sendStatus(201);
});

app.get("/articles/:id", (req, res) => {
  const { id } = req.params;
  const articles = readArticles();
  const one = articles.find((item) => item.id === id);
  const categories = readCategories();
  const category = categories.find(
    (category) => category.id === one.categoryId
  );
  one.category = category;
  if (one) {
    res.json(one);
  } else {
    res.sendStatus(404);
  }
});

app.get("/articles/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  const articles = readArticles();
  const filteredId = articles.filter(
    (articles) => articles.categoryId === categoryId
  );
  console.log(categoryId);
  if (filteredId) {
    res.json(filteredId);
  } else {
    res.sendStatus(404);
  }
});
app.listen(port, () => {
  console.log("App is listering at port", port);
});
