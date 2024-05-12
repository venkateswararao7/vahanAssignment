import db from "../model/datamodel.js";
const userdata = async (req, res) => {
    try {
        const q = "select * from person";
        const result = await db.query(q);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(400).json("users are not found");
    }
};

export default userdata;
