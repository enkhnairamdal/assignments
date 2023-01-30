const express = require("express");
const cors = require("cors");
const port = 8800;
const app = express();

const { v4 } = require("uuid");
app.use(cors());
app.use(express.json());

const categories = [
  {
    id: v4(),
    name: "uls tor",
    // Image:
    //   "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=600",
    // Text: ".aksjhfasuhsiufdhafiusdahfsaiuhfasdipufhsadiufhasdiufhasdiufhdsauihf",
  },
  {
    id: v4(),
    name: "sport",
    // Image:
    //   "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=600",
    // Text: ".aksjhfasuhsiufdhafiusdahfsaiuhfasdipufhsadiufhasdiufhasdiufhdsauihf",
  },
  {
    id: v4(),
    name: "bat",
    // Image:
    //   "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=600",
    // Text: ".aksjhfasuhsiufdhafiusdahfsaiuhfasdipufhsadiufhasdiufhasdiufhdsauihf",
  },
];

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.get("/users", (req, res) => {
//   res.json(users);
// });
// app.get("/users/save", (req, res) => {
//   res.json(item);
// });

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const one = categories.find((category) => category.id === id);
  if (one) {
    res.json(one);
  } else {
    res.sendStatus(404);
  }
});
app.post("/categories", (req, res) => {
  const { name } = req.body;
  const newCategories = { id: v4(), name: name };
  categories.push(newCategories);
  res.sendStatus(201);
});
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const one = categories.find((category) => category.id === id);
  if (one) {
    const newList = categories.filter((category) => category.id !== id);
    categories = newList;
    res.json({ deletedId: id });
  } else {
    res.sendStatus(404);
  }
});

app.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { Text } = req.body;
  const { Image } = req.body;
  const index = categories.findIndex((category) => category.id === id);
  if (index > -1) {
    categories[index].name = name;
    categories[index].Text = Text;
    categories[index].Image = Image;

    res.json({ updatedId: id });
  } else {
    res.sendStatus(404);
  }
});
app.listen(port, () => {
  console.log("App is listering at port", port);
});
