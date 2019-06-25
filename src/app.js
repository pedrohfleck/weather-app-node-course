const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Pedro Fleck"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pedro Fleck"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "help",
    title: "Help",
    name: "Pedro Fleck"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Provide an address");
  }
  geocode(req.query.address, (error, { latitude, longitude, local } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (error, { forecast }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        local,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "Help page not found",
    error: "Specific help page does not exist",
    name: "Pedro Fleck"
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "Page not found",
    error: "Specific page does not exist",
    name: "Pedro Fleck"
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
