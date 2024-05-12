import db from "../model/datamodel.js";

const insertdata = async (req, res) => {
    console.log(req.body)
    try {
        const { email, name, mobilenumber, dateofbirth } = req.body;

        // Use parameterized queries to prevent SQL injection and properly handle values
        const q = `INSERT INTO Person ("email", "name", "mobilenumber", "dateofbirth") VALUES($1, $2, $3, $4)`;
        const values = [email, name, mobilenumber, dateofbirth];

        // Execute the query with the provided values
        const result = await db.query(q, values);

        res.json("record inserted successfully");
    } catch (err) {
        // Handle errors properly
        res.status(500).json({ error: err.message });
    }
}

export default insertdata;
