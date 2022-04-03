const express = require('express')
const app = express()
const port = 5000
const pool = require("./db")

app.use(express.json())

//get names on football

app.get("/football", async (req, res) => {
    try{
        const footballPlayers = await pool.query("SELECT * FROM football");
        res.json(footballPlayers.rows)

    } catch (err) {
        console.error(err.message)
    }
})

//get names on tennis

app.get("/tennis", async (req, res) => {
    try{
        const tennisPlayers = await pool.query("SELECT * FROM tennis");
        res.json(tennisPlayers.rows)

    } catch (err) {
        console.error(err.message)
    }
})

//get a name on football

app.get("/football/:id", async (req, res) => {
    try{
        const { id } = req.params
        const footballPlayer = await pool.query("SELECT * FROM football WHERE id = $1", [id]);
        res.json(footballPlayer.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//get a name on tennis

app.get("/tennis/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tennisPlayer = await pool.query("SELECT * FROM tennis WHERE id = $1", [id]);
        res.json(tennisPlayer.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//post names on football
app.post("/football", async(req, res) => {
    try {
        const { first_name, last_name, age } = req.body;
        const newPlayer = await pool.query("INSERT INTO football(first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
        [first_name, last_name, age]
    );

    res.json(newPlayer.rows[0]);
        //console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
})

//post names on tennis
app.post("/tennis", async(req, res) => {
    try {
        const { first_name, last_name, age } = req.body;
        const newTennisPlayer = await pool.query("INSERT INTO tennis(first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
        [first_name, last_name, age]
    );

    res.json(newTennisPlayer.rows[0]);
        //console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
})

//update names on football

app.put('/football/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { first_name, last_name, age } = req.body;
        const updateFootballFirstName = await pool.query("UPDATE football SET first_name = $1 WHERE id = $2", [first_name, id]);
        const updateFootballLastName = await pool.query("UPDATE football SET last_name = $1 WHERE id = $2", [last_name, id]);
        const updateFootballAge = await pool.query("UPDATE football SET age = $1 WHERE id = $2", [age, id]);
        res.json("Record updated!")

    } catch(err) {
        console.error(err.message)
    }
})

//update names on tennis
app.put('/tennis/:id', async(req, res) => {
    const { id } = req.params
    const {first_name, last_name, age} = req.body
    try {
        const updateTennisFirstName = await pool.query("UPDATE tennis SET first_name = $1 WHERE id = $2", [first_name, id]);
        const updateTennisLastName = await pool.query("UPDATE tennis SET last_name = $1 WHERE id = $2", [last_name, id]);
        const updateTennisAge = await pool.query("UPDATE tennis SET age = $1 WHERE id = $2", [age, id]);
        res.json("Record updated!")
    } catch(err){
        console.error(err.message)
    }

})

//delete name on football
app.delete('/football/:id', async(req,res) => {
    const { id } = req.params
    const {first_name, last_name, age} = req.body
    try {
        const deleteFootballPlayer = await pool.query("DELETE FROM football WHERE id = $1", [id]);
        res.json("Record deleted!")

    } catch(err) {
        console.error(err.message)
    }
})

//delete name on tennis
app.delete('/tennis/:id', async(req,res) => {
    const { id } = req.params
    const {first_name, last_name, age} = req.body
    try {
        const deleteTennisPlayer = await pool.query("DELETE FROM tennis WHERE id = $1", [id]);
        res.json("Record deleted!")

    } catch(err) {
        console.error(err.message)
    }
})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
