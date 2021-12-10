const pool = require('../models/db')
const path = require('path')

//create a scolarship
const createscolarship = async (req,res) =>{
    try {
        
        console.log("...")
        //  console.log(req.file)
        const {deadline,link,body } = req.body;
        console.log(req.body);
        const { filename, mimetype, size } = req.file;
        const filepath = req.file.path;
        console.log(filepath);
        console.log(req.body.body);
        
        // console.log(filepath,filename,mimetype,size);

        const user_id = req.user.id;
        const newScolarship = await pool.query(
            "insert into scolarships (body,deadline,link,filename,filepath,user_id) values($1,$2,$3,$4,$5,$6)",[body,deadline,link,filename,filepath,user_id]
        );  

        res.json(newScolarship[0])
        
    }catch(err){
        console.log(err.message);
    }
}

// get all scolarship
const scolarships = async (req,res) =>{
    try{
       const { page } = req.query;
        console.log(page);
        const limit = 20;
       const {rows} = await pool.query("SELECT COUNT(*) from scolarships");
       const allScolarships = await pool.query("select * from scolarships ORDER BY id DESC LIMIT $1 OFFSET $2", [limit, limit*page]);
        // res.send("");
       res.json({ "scolarship": allScolarships.rows , "count":rows[0].count,"limit":limit });
    }catch(err){
        console.log(err.message);
    }
}

// read scolarship image file
const readImage = async (req,res) =>{
    try {

        console.log("readImage");
        const { filename } = req.params;
        // console.log(filename);
        const scolarship = await pool.query("select * from scolarships where filename = $1", [ filename ]);
        // console.log(thread);
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, scolarship.rows[0].filepath);
        res.sendFile(fullfilepath)
    }catch(err){
        console.log(err.message);
    }
}

// get a scolarship
const scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const scolarship = await pool.query("select * from scolarships where id = $1", [id]);
        res.json(scolarship.rows[0]);

    }catch(err){
        console.log(err.message);
    }
}

// update scolarship
const updatescolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const { body,deadline,link} = req.body;
        pool.query("update scolarships set   body = $1 , deadline = $2 , link = $3 where id = $4",[body,deadline,link,id]);
        res.json("scolarship is successfully updated");  
    }catch(err){
        console.log(err.message);
    }
}

// delete scolarship
const deletescolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from scolarships where id=$1",[id]);
        res.json("scolarship is successfully deleted");
       
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    createscolarship,scolarships , readImage, scolarship , updatescolarship , deletescolarship
}