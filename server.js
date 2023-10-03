const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
  res.render("index");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})