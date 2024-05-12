import db from "../model/datamodel.js";

const deleteuser = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const q = `DELETE FROM person WHERE email='${email}'`;
        const result = await db.query(q);
        console.log(email);
        res.status(200).json(result);
    }
    catch (err) {
        res.json(err);
    }
}

export default deleteuser;
