const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,'views')))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/',(req,res)=>{
  res.render('index')
})
app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/about", function(req, res){
  res.render("AboutUs");
});
app.get("/healthCare", function(req, res){
  res.render("health_care");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})