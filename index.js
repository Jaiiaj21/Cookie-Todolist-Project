import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Todolist",
    password: "123456",
    port: 5433
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// async function registerUser(username, email, password) {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log('Hashed Password:', hashedPassword);
//       // Save 'username', 'email', and 'hashedPassword' in your database
//     } catch (error) {
//       console.error(error);
//       // Handle the error appropriately
//     }
// }

// async function authenticateUser(enteredPassword, storedHashedPassword) {
//     try {
//       const passwordMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);

//       if (passwordMatch) {
//         console.log('Password is correct! Allow access to the user.');
//         // Proceed with allowing access to the user
//       } else {
//         console.log('Password is incorrect. Deny access.');
//         // Deny access to the user
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle the error appropriately
//     }
//   }

let currentUserId = 1;

async function fetchAllToDo(currentUserId){
    const result = await db.query(
        "SELECT act_id, activity FROM activities WHERE user_id = $1 ORDER BY act_id ASC;",
        [currentUserId]);
    const allToDo = result.rows.map((todo) => todo);
    return allToDo;
}


app.get("/", async (req, res) => {
    const allToDo = await fetchAllToDo(currentUserId);
    // console.log(allToDo);
    res.render("index.ejs",{
        toDoTitle: "Today",
        allToDo: allToDo,
        total: allToDo.length
    });
});

app.post("/add", async (req, res) => {
    const newToDo = req.body.newItem;
    const insertNewToDo = await db.query(
        "INSERT INTO activities(user_id, activity) VALUES ($1, $2) RETURNING *;",
        [currentUserId, newToDo]
    );
    // console.log(insertNewToDo.rows);
    res.redirect("/");

});

app.post("/delete", async (req, res) => {
    const deleteItemId = req.body.deleteItemId;
    // console.log(req.body);
    await db.query(
        "DELETE FROM activities WHERE act_id = $1;",
        [deleteItemId]
    );
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
