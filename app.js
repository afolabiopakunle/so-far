let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/students-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = mongoose.Schema({
  name: String,
  imageURL: String
});

const Student = mongoose.model("Student", studentSchema);

// Student.create({
//   name: "Babajide Sanwolu",
//   imageURL: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg"
// });

// let students = [
//   {
//     name: "Jide",
//     surname: "Kosoko",
//     imageURL: "https://randomuser.me/api/portraits/men/32.jpg"
//   },
//   {
//     name: "Tunde",
//     surname: "Ednut",
//     imageURL: "https://randomuser.me/api/portraits/men/3.jpg"
//   },
//   {
//     name: "Kola",
//     surname: "Oyewo",
//     imageURL: "https://randomuser.me/api/portraits/men/86.jpg"
//   }
// ];

app.get("/", (req, res) => {
  Student.find((err, students) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(students);
      res.render("all-students", { students });
    }
  });
});

app.get("/add-student", (req, res) => {
  res.render("add-student");
});

app.post("/add-student", (req, res) => {
  let name = req.body.name;
  let imageURL = req.body.imageURL;
  let surname = req.body.surname;
  Student.create({ name, imageURL, surname }, (err, student) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.listen(3000, () =>
  console.log(`port listening on port ${PORT} http://localhost:${PORT}`)
);
