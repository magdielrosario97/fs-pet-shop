const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// GET ALL PETS
app.get("/pets", async (req, res) => {
   try {
      const allPets = await pool.query("SELECT * FROM pets");
      res.json(allPets.rows);
   } catch (err) {
      console.error(err.message);
   }
});

// GET A PET
app.get("/pets/:id", async (req, res) => {
   const id = req.params.id;
   try {
      const pet = await pool.query("SELECT * FROM pets WHERE id = $1", [id]);
      res.json(pet.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

// CREATE A PET
app.post("/pets", async (req, res) => {
   try {
      const body = req.body;
      const petName = body.name;
      const petAge = body.age;
      const petKind = body.kind;
      const newPet = await pool.query(
         "INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3) RETURNING *",
         [petName, petAge, petKind]
      );
      res.json(newPet.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

// UPDATE A PET
app.patch("/pets/:id", async (req, res) => {
   const id = req.params.id;
   try {
      const petQuery = await pool.query("SELECT * FROM pets WHERE id = $1", [
         id,
      ]);
      const body = req.body;
      const petName = body.name || petQuery.rows[0].name;
      const petAge = body.age || petQuery.rows[0].age;
      const petKind = body.kind || petQuery.rows[0].kind;
      const updatePet = await pool.query(
         "UPDATE pets SET name = $1, age = $2, kind = $3 WHERE id = $4",
         [petName, petAge, petKind, id]
      );
      res.json("Pet was updated.");
   } catch (err) {
      console.log(err.message);
   }
});

// DELETE A PET
app.delete("/pets/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deletePet = await pool.query("DELETE FROM pets WHERE id = $1", [
         id,
      ]);
      res.json("Pet was deleted.");
   } catch (err) {
      console.error(err.message);
   }
});

app.listen(5555, () => {
   console.log(`Listening on 5555`);
});
