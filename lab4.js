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
    access: true
  })
})
app.get("/post",(req,resp)=>{
  resp.render("post.hbs",{
    list: controller.get(),
    access: false
  })
})

app.get("/update",(req,resp)=>{
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  let result = controller.get();
  let inf;
  for (var i = 0; i < result.length; i++) {
    if (result[i]["fio"] == query["fio"]) {
      inf = result[i];
      break;
    }
  }
  resp.render("update.hbs",{
    list: controller.get(),
    fio: inf["fio"],
    number: inf["number"],
    access: false
  })
})

app.get("/delete",(req,resp)=>{
  resp.render("update.hbs",{
    list: controller.get()
  })
})


app.post("/post",(req,resp)=>{
  controller.post(req.body)
  resp.redirect(303,"/")
})

app.post("/update",(req,resp)=>{
  controller.update(req.body)
  resp.redirect(303,"/")
})
app.post("/delete/:fio",(req,resp)=>{
  controller.delete(req.params)
  resp.redirect(303,"/")
})

app.listen(3000)