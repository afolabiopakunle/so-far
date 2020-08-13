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
  imageURL: String,
  summary: String
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
  Student.find({}, (err, students) => {
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
  let summary = req.body.summary;
  let newStudent = { name, imageURL, surname, summary };
  Student.create(newStudent, (err, student) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.listen(3000, () =>
  console.log(`port listening on port ${PORT} http://localhost:${PORT}`)
);
