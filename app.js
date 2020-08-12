let app = require("express")();
let bodyParser = require("body-parser");
let PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
let students = [
  {
    name: "Jide",
    surname: "Kosoko",
    imageURL: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Tunde",
    surname: "Ednut",
    imageURL: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Kola",
    surname: "Oyewo",
    imageURL: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

app.get("/", (req, res) => {
  res.render("all-students", { students });
});

app.get("/add-student", (req, res) => {
  res.render("add-student");
});

app.post("/add-student", (req, res) => {
  let name = req.body.name;
  let imageURL = req.body.imageURL;
  let surname = req.body.surname;
  students.push({ name, imageURL, surname });
  res.redirect("/");
});

app.listen(3000, () =>
  console.log(`port listening on port ${PORT} http://localhost:${PORT}`)
);
