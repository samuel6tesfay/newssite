const pool = require('../models/db')
const cloudinary = require("../middleware/cloudinary");

//create a scolarship
const createscolarship = async (req,res) =>{
    try {
        const user_id = req.user.id;
        const result = await cloudinary.uploader.upload(req.file.path);
        const {deadline,link,body} = req.body;
        const avatar = result.secure_url;
        const cloudinary_id = result.public_id;
        const newScolarship = await pool.query("insert into scolarships (body,deadline,link,avatar,cloudinary_id,user_id) values($1,$2,$3,$4,$5,$6)",[body,deadline,link,avatar,cloudinary_id,user_id]);  
        res.json(newScolarship[0])
    } catch (err) {
        res.json("error");
    }
}
// get all scolarship
const scolarships = async (req,res) =>{
    try{
       const { page } = req.query;
       const limit = 20;
       const {rows} = await pool.query("SELECT COUNT(*) from scolarships");
       const allScolarships = await pool.query("select * from scolarships ORDER BY id DESC LIMIT $1 OFFSET $2", [limit, limit*page]);
       res.json({ "scolarship": allScolarships.rows , "count":rows[0].count,"limit":limit });
    } catch (err) {
        res.json("error");
    }
}

// get a scolarship
const scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const scolarship = await pool.query("select * from scolarships where id = $1", [id]);
        res.json(scolarship.rows[0]);
    } catch (err) {
        res.json("error");
    }
}

// update scolarship
const updatescolarship = async (req,res) =>{
    try{
        
        const { id } = req.params;
        const scolarship = await pool.query("select * from scolarships where id = $1", [id]);
        await cloudinary.uploader.destroy(scolarship.rows[0].cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const deadline = req.body.deadline || scolarship.rows[0].deadline;
        const body = req.body.body || scolarship.rows[0].body;
        const link = req.body.link || scolarship.rows[0].link;
        const avatar = result?.secure_url || scolarship.rows[0].avatar;
        const cloudinary_id = result?.public_id || scolarship.rows[0].cloudinary_id;
        await pool.query("update scolarships set  body = $1 , deadline = $2 , link = $3 , avatar=$4, cloudinary_id=$5 where id = $6", [body, deadline, link, avatar, cloudinary_id, id])
        res.json("scolarsship is successfully updated");
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete scolarship
const deletescolarship = async (req,res) =>{
    try{
       
        const { id } = req.params;
        const scolarship = await pool.query("select * from scolarships where id = $1", [id]);
        await cloudinary.uploader.destroy(scolarship.rows[0].cloudinary_id);
        await pool.query("delete from scolarships where id=$1", [id]);
        res.json("scolarship is successfully deleted");
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    createscolarship,scolarships , scolarship , updatescolarship , deletescolarship 
}