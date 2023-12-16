const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_Path = path.join(__dirname, "public");
const template_Path = path.join(__dirname, "../template/views");
const partials_Path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_Path));
app.set("view engine", "hbs");
app.set("views", template_Path);
hbs.registerPartials(partials_Path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.c_password;

    if (password === cpassword) {
      const registration_sam = new Register({
        Username: req.body.Username,
        fullname: req.body.fullname,
        Email: req.body.Email,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender,
        password: password,
        cpassword: cpassword,
      });
      const registered = await registration_sam.save();
      res.status(201).redirect("/login"); // Redirect to login page after successful registration
    } else {
      res.send("Passwords don't match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Email, password } = req.body;
    const user = await Register.findOne({ Email, password });

    if (user) {
      res.redirect("/home");
    } else {
      res.send("Invalid login credentials");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
