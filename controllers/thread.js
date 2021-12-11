const pool = require('../models/db')
const path = require('path')

//create a thread
const createthread = async (req,res) =>{
    try {
        
        //  console.log(req.file)
        const { username, body, link } = req.body;
        // console.log(req.body);
        const { filename,path} = req.file;
        console.log(req.file);
        console.log(req.body.username);
        
        // console.log(filepath,filename,mimetype,size);

        const user_id = req.user.id;
        const thread = pool.query(
            "insert into threads (username,body,link,filename,filepath,user_id) values($1,$2,$3,$4,$5,$6)",[username,body,link,filename,path,user_id]
        );  

        res.json(thread[0])
        
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// get all todo
const threads = async (req,res) =>{
    try {

        const { page,filter,sort } = req.query;
        console.log(req.query);

        const {rows} = await pool.query("SELECT COUNT(*) from threads");

        const limit = 10;

        const allThreads = await pool.query("select * from threads WHERE body ~* '.*"+filter+".*' ORDER BY  "+sort+" DESC LIMIT $1 OFFSET $2  ", [limit, limit*page]);
        // res.send("");
        // console.log(allThreads);
        res.json({ "thread": allThreads.rows , "count":rows[0].count,"limit":limit });
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// read thread image file
const readImage = async (req,res) =>{
    try {

        
        const { filename } = req.params;
        // console.log(filename);

        const thread = await pool.query("select * from threads where filename = $1", [ filename ]);
        
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, thread.rows[0].filepath);
        res.sendFile(fullfilepath)       
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
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
    try{
        const { id } = req.params;
        // const { username, body, link } = req.body;

        console.log(req.query);
        // const { filename, path } = req.file.filename && req.file ;
        // pool.query("update threads set   username = $1 , body = $2 , link = $3 , filename=$4, filepath=$5 where id = $6", [username, body, link, filename, path, id])
        pool.query("update threads set   username = $1 , body = $2 , link = $3  where id = $4",[username,body,link,id]);

        res.json("thread is successfully updated"); 
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete todo
const deletethread = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from threads where id=$1",[id]);
        res.json("thread is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    createthread,threads , readImage, thread , updatethread , deletethread ,update_view
}