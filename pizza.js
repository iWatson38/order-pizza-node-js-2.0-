const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

app.use("/public", express.static('public'));

app.get("/", function (req, res) {
  res.render("pizza");
});

app.get("/info", function (req, res) {
  res.render("info");
});

app.get("/basket", function (req, res) {
  res.render("basket", {price: false, name: false});
});

app.post("/", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  res.render('pizza');
  Data = new Date();
  var FileOrderR = fs.readFileSync("some.txt", "utf8");
  var FileOrderW = "Заказ(" + Data.getDate() + "." + Data.getMonth() + "." + Data.getFullYear() + ", " + 
  Data.getHours() + ":" + Data.getMinutes() + ":" + Data.getSeconds() + "): \n" + "Пицца: " + req.body.a + 
  "\n" + "Количество: " + req.body.b + "\n" + "Цена: " + req.body.c + "\n" + "Адрес: " + req.body.d + "\n";
  fs.writeFileSync('some.txt', FileOrderR+FileOrderW);
});

app.post("/basket", urlencodedParser, function (req, res) {
  const data = fs.readFileSync("price.json", "utf8");
  const priceReaded = JSON.parse(data);
  if (req.body.names && priceReaded[req.body.names].price * req.body.quantity<500)
    res.render("basket", {
      price: priceReaded[req.body.names].price * req.body.quantity + priceReaded.delivery,
      name: priceReaded[req.body.names].name,
      quantity: req.body.quantity,
      address: req.body.address
    });
  if (req.body.names && req.body.quantity==2)
  res.render("basket", {
    price: priceReaded[req.body.names].price * req.body.quantity*priceReaded.TwoPizza,
    name: priceReaded[req.body.names].name,
    quantity: req.body.quantity,
    address: req.body.address
  });
  if (req.body.names && req.body.quantity>=3)
  res.render("basket", {
    price: priceReaded[req.body.names].price * req.body.quantity*priceReaded.MoreThree,
    name: priceReaded[req.body.names].name,
    quantity: req.body.quantity,
    address: req.body.address
  });
  if (!req.body.names)
    res.render("basket", {
      price: false,
      name: false,
      quantity: false,
      address: false
    });
});
//function Write(name, quantity, price) {
  //console.log('Hi!')
  //Data = new Date();
  //var FileOrder = "Заказ(" + Data.getDate() + " " + Data.getMonth() + " " + Data.getFullYear() + ", " + Data.getHours() + ":" + Data.getMinutes() + ":" + Data.getSeconds() + "): \n" + name + "\n" + quantity + "\n" + price + "\n";
  //fs.writeFile('order.txt', FileOrder, function(err, data) {});
  //console.log(order.txt);
//}

app.listen(3001);
