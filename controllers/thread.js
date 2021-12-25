const pool = require('../models/db')
const cloudinary = require("../middleware/cloudinary");

//create a thread
const createthread = async (req, res) => {
    try {
        const user_id = req.user.id;
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        console.log(req.body);
        const { username, body, link } = req.body;
        const avatar = result.secure_url;
        const cloudinary_id = result.public_id;
        const thread = await pool.query(
            "insert into threads (username,body,link,avatar,cloudinary_id,user_id) values($1,$2,$3,$4,$5,$6)",[username,body,link,avatar,cloudinary_id,user_id]
        );  
        res.json(thread[0])      
    } catch (err) {
        res.json("error");
    }
}

// get all todo
const threads = async (req,res) =>{
    try {
        const { page,filter,sort } = req.query;
        const {rows} = await pool.query("SELECT COUNT(*) from threads");
        const limit = 10;
        const allThreads = await pool.query("select * from threads WHERE username ~* '.*"+filter+".*' OR  body ~* '.*"+filter+".*' ORDER BY  "+sort+" DESC LIMIT $1 OFFSET $2  ", [limit, limit*page]);
        res.json({ "thread": allThreads.rows , "count":rows[0].count,"limit":limit });   
    } catch (err) {
        res.json("error");
    }
}

// get a todo
const thread = async (req,res) =>{
    try{
        const { id } = req.params;
        const thread = await pool.query("select * from threads where id = $1", [id]);
        res.json(thread.rows[0]);
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

//update views
const update_view = async (req, res) => {
    try {
        const { id } = req.params;
        const thread = await pool.query("select * from threads where id = $1", [id]);
        let view = thread.rows[0].views + 1;
        const thread_update = await pool.query("update threads set  views = $1  where id = $2",[view,id]);
        res.json(thread.rows[0]);
    } catch (err) {
        res.json("error");
        err.message
    }
}

// update todo
const updatethread = async (req,res) =>{
    try {
        const { id } = req.params;
        const thread = await pool.query("select * from threads where id = $1", [id]);
        await cloudinary.uploader.destroy(thread.rows[0].cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const username = req.body.username || thread.rows[0].username;
        const body = req.body.body || thread.rows[0].body;
        const link = req.body.link || thread.rows[0].link;
        const avatar = result?.secure_url || thread.rows[0].avatar;
        const cloudinary_id = result?.public_id || thread.rows[0].cloudinary_id;
        await pool.query("update threads set  username = $1 , body = $2 , link = $3 , avatar=$4, cloudinary_id=$5 where id = $6", [username, body, link, avatar, cloudinary_id, id])
        res.json("thread is successfully updated"); 
    }catch(err) {
        res.json("error");
    }
}

// delete todo
const deletethread = async (req,res) =>{
    try{
        const { id } = req.params;
        const thread = await pool.query("select * from threads where id = $1", [id]);
        await cloudinary.uploader.destroy(thread.rows[0].cloudinary_id);
        await pool.query("delete from threads where id=$1", [id]);
        res.json("thread is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    createthread,threads , thread , updatethread , deletethread ,update_view
}