const express = require('express');
const url = require("url");
const controller=require("./controller")
const bodyParser=require("body-parser")

const handlebars = require("express-handlebars").create({
  extname: ".hbs",
  partialsDir: "./partials",
  helpers: {
    discard: () => {
      return '<a href="/"">discard</a>';
    },
  },
});
let app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static("public"));



app.get("/",(req,resp)=>{
  resp.render("get.hbs",{
    list: controller.get(),
    title: "Telephone List",
    click: true
  })
})
app.get("/post",(req,resp)=>{
  resp.render("post.hbs",{
    list: controller.get(),
    title: "Telephone List",
    click: false
  })
})

app.get("/update",(req,resp)=>{
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  let result = controller.get();
  let send;
  for (var i = 0; i < result.length; i++) {
    if (result[i]["fio"] == query["fio"]) {
      send = result[i];
      break;
    }
  }
  resp.render("update.hbs",{
    list: controller.get(),
    title: "Telephone list",
    fio: send["fio"],
    number: send["number"],
    click: false
  })
})

app.get("/delete",(req,resp)=>{
  resp.render("update.hbs",{
    list: controller.get(),
    title: "Telephone List",
  })
})


app.post("/post",(req,resp)=>{
  controller.post(req.body)
  resp.redirect(303,"/")
})

app.post("/update",(req,resp)=>{
  console.log(req.body)
  controller.update(req.body)
  resp.redirect(303,"/")
})
app.post("/delete/:fio",(req,resp)=>{
  controller.delete(req.params)
  resp.redirect(303,"/")
})

app.listen(3000)