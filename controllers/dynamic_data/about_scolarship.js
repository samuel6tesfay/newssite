const pool = require('../../models/db')
const cloudinary = require("../../middleware/cloudinary");

//create a about_scolarship
const create_about_scolarship = async (req,res) =>{
    try {
 
        const user_id = req.user.id;
        const result = await cloudinary.uploader.upload(req.file.path);
        const { title, discription, button } = req.body;
        const avatar = result.secure_url;
        const cloudinary_id = result.public_id;
        const new_about_scolarship = await pool.query(
            "insert into about_scolarship (title,discription,button,avatar,cloudinary_id,user_id) values($1,$2,$3,$4,$5,$6)",[title,discription,button,avatar,cloudinary_id,user_id]
        );  
        res.json(new_about_scolarship[0])  


    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}


// get all todo
const about_scolarships = async (req,res) =>{
    try {

        const allabout_scolarships = await pool.query("select * from about_scolarship");
        res.json(allabout_scolarships.rows);
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}


// get a todo
const about_scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const about_scolarship = await pool.query("select * from about_scolarship where id = $1", [id]);
        res.json(about_scolarship.rows[0]);

    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// update todo
const update_about_scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const about_scolarship = await pool.query("select * from about_scolarship where id = $1", [id]);
        await cloudinary.uploader.destroy(about_scolarship.rows[0].cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const title = req.body.title || about_scolarship.rows[0].title;
        const discription = req.body.discription || about_scolarship.rows[0].discription;
        const button = req.body.button || about_scolarship.rows[0].button;
        const avatar = result?.secure_url || about_scolarship.rows[0].avatar;
        const cloudinary_id = result?.public_id || about_scolarship.rows[0].cloudinary_id;
        await pool.query("update about_scolarship set  title = $1 , discription = $2 , button = $3 , avatar=$4, cloudinary_id=$5 where id = $6", [title, discription, button, avatar, cloudinary_id, id])
        res.json("about_scolarship is successfully updated"); 

    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete todo
const delete_about_scolarship = async (req,res) =>{
    try{
        
        const { id } = req.params;
        const about_scolarship = await pool.query("select * from about_scolarship where id = $1", [id]);
        await cloudinary.uploader.destroy(about_scolarship.rows[0].cloudinary_id);
        await pool.query("delete from about_scolarship where id=$1", [id]);
        res.json("about_scolarship is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    create_about_scolarship,about_scolarships , about_scolarship , update_about_scolarship , delete_about_scolarship
}