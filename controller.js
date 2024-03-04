
const fs=require("fs");
module.exports = {
  get: ()=>{
    let fileJson = fs.readFileSync("guide.json");
    return JSON.parse(fileJson.toString());
  },

  post: (json) => {
    let data = fs.readFileSync("guide.json");
    let myObject = JSON.parse(data);
    let existingObject = myObject.find(obj => obj.fio === json.fio);
    if (existingObject) {
      console.log('Объект уже существует');
      return;
    }
    let newData = { fio: json.fio, number: json.number };
    myObject.push(newData);
    let newData2 = JSON.stringify(myObject);
    fs.writeFileSync("guide.json", newData2);
  },
  update: (json) => {
    let data = fs.readFileSync("guide.json");
    let result = JSON.parse(data);
    for (var i = 0; i < result.length; i++) {
      if (result[i].fio == json.fio) {
        result[i].number = json.number;
      }
    }
    fs.writeFileSync("guide.json", JSON.stringify(result));
  },
  delete: (json) => {
    let data = fs.readFileSync("guide.json");
    let myObject = JSON.parse(data);
    let fio = json.fio;
    let newObject = myObject.filter(obj => obj.fio !== fio);
    newObject = JSON.stringify(newObject);
    fs.writeFileSync("guide.json", newObject);
  }
}