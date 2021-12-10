const pool = require('../../models/db')

//create a about_scolarship
const create_about_scolarship = async (req,res) =>{
    try {
        
        const { title, discription, button } = req.body;
         const { filename, mimetype, size } = req.file;
        const filepath = req.file.path;
        
        const user_id = req.user.id;
        const new_about_scolarship = await pool.query(
            "insert into about_scolarship (title,discription,button,filename,filepath,user_id) values($1,$2,$3,$4,$5,$6)",[title,discription,button,filename,filepath,user_id]
        );  

        res.json(new_about_scolarship[0])
        
    }catch(err){
        console.log(err.message);
    }
}

const readImage = async (req,res) =>{
    try {

        console.log("readImage");
        
        const { filename } = req.params;
        // console.log(filename);

        const about_scolarship = await pool.query("select * from about_scolarship where filename = $1", [ filename ]);
        
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, about_scolarship.rows[0].filepath);
        res.sendFile(fullfilepath)       
       
    }catch(err){
        console.log(err.message);
    }
}

// get all todo
const about_scolarships = async (req,res) =>{
    try {

        const allabout_scolarships = await pool.query("select * from about_scolarship");
        res.json(allabout_scolarships.rows);
       
    }catch(err){
        console.log(err.message);
    }
}


// get a todo
const about_scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const about_scolarship = await pool.query("select * from about_scolarship where id = $1", [id]);
        res.json(about_scolarship.rows[0]);

    }catch(err){
        console.log(err.message);
    }
}

// update todo
const update_about_scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        const { title , discription,button} = req.body;
        pool.query("update about_scolarship set   title = $1 , discription = $2 , button = $3 where id = $4",[title,discription,button,id]);
        res.json("about_scolarship is successfully updated"); 
    }catch(err){
        console.log(err.message);
    }
}

// delete todo
const delete_about_scolarship = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from about_scolarship where id=$1",[id]);
        res.json("about_scolarship is successfully deleted");
      
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    create_about_scolarship,about_scolarships , about_scolarship , update_about_scolarship , delete_about_scolarship,readImage
}