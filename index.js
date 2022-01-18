const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const exp = require("constants");

const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("⭕ OOPS! Something went wrong :( ⭕");
    res.render("scan", {
      qr_code: src,
    });
  });
});
app.listen(port, console.log(`Server running at ${port}. \nOpen your browser and type localhost:${port}`));
