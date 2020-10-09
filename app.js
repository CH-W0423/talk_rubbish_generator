const express = require("express");
const exphbs = require("express-handlebars");
const roles = require("./roles.json").results;
const bodyParser = require("body-parser");
const app = express();
const Handlebars = require("handlebars");
const talkRubbishGenerator = require("./talk_rubbish_generator");
const port = 3000;

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set static files
app.use(express.static("public"));

//set route
app.get("/", (req, res) => {
  res.render("index", { roles });
});

app.post("/", (req, res) => {
  const role = req.body.role;
  const talkRubbish = talkRubbishGenerator(role);
  res.render("index", { roles, talkRubbish, role });
});

//set template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//start and listen to the server
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}`);
});

//set helper
Handlebars.registerHelper("if_equal", function (a, b) {
  if (a === b) {
    return "checked";
  }
});
