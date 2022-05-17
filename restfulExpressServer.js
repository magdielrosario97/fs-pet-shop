const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

let dataPath = path.join(__dirname, "pets.json");

const PORT = 5555;

//Middleware
app.use(express.json());

//GET ALL
app.get("/:id", (req, res, next) => {
   fs.readFile(dataPath, "utf-8", (err, data) => {
      if (req.params.id !== "pets") {
         res.status(404)
            .setHeader("Content-type", "text/plain")
            .send("Not Found");
      } else {
         let result = JSON.parse(data);
         res.status(200).json(result);
      }
   });
});

//GET ID
app.get("/pets/:id", (req, res, next) => {
   fs.readFile(dataPath, "utf-8", (err, data) => {
      let id = req.params.id;
      let result = JSON.parse(data);
      let toBeSent = result[id];
      if (!toBeSent) {
         res.status(404).json({ message: "Not Found" });
      } else {
         res.json(toBeSent);
      }
   });
});

// POST
app.post("/pets", (req, res, next) => {
   fs.readFile(dataPath, "utf-8", (err, data) => {
      let result = JSON.parse(data);
      let body = req.body;
      if (
         body.name === undefined ||
         body.kind === undefined ||
         Number.isInteger(body.age) === false
      ) {
         res.status(400)
            .setHeader("Content-type", "text/plain")
            .send("Bad Request");
      } else {
         result.push(body);
      }
      fs.writeFile(dataPath, JSON.stringify(result), function (err) {
         if (err) {
            console.log(err);
         } else {
            res.send(req.body);
         }
      });
   });
});

// UPDATE (PATCH)
app.patch("/pets/:id", (req, res, next) => {
   fs.readFile(dataPath, "utf-8", (err, data) => {
      let id = req.params.id;
      let result = JSON.parse(data);
      let body = req.body;
      result[id].age = body.age || result[id].age;
      result[id].kind = body.kind || result[id].kind;
      result[id].name = body.name || result[id].name;
      fs.writeFile(dataPath, JSON.stringify(result), function (err) {
         if (err) {
            console.log(err);
         } else {
            res.send(req.body);
         }
      });
   });
});

// DELETE
app.delete("/pets/:id", (req, res) => {
   fs.readFile(dataPath, "utf-8", (err, data) => {
      let id = req.params.id;
      let result = JSON.parse(data);
      let deleted = result[id];
      result.splice(id);

      fs.writeFile(dataPath, JSON.stringify(result), function (err) {
         if (err) {
            console.log(err);
         } else {
            res.send(deleted);
         }
      });
   });
});

// LISTEN
app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
});
