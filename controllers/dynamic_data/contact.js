const pool = require('../../models/db')

//create a contact
const create_contact = async (req,res) =>{
    try {
        
        const {  title } = req.body;
        const user_id = req.user.id;
        const new_contact = await pool.query(
            "insert into contact (title,user_id) values($1, $2)",[title,user_id]
        );  

        res.json(new_contact[0])
        
    }catch(err){
        console.log(err.message);
    }
}

// get all todo
const contacts = async (req,res) =>{
    try {

        const allcontacts = await pool.query("select * from contact");
        res.json(allcontacts.rows);
       
    }catch(err){
        console.log(err.message);
    }
}


// get a todo
const contact = async (req,res) =>{
    try{
        const { id } = req.params;
        const contact = await pool.query("select * from contact where id = $1", [id]);
        res.json(contact.rows[0]);

    }catch(err){
        console.log(err.message);
    }
}

// update todo
const update_contact = async (req,res) =>{
    try{
        const { id } = req.params;
        const { title} = req.body;
                pool.query("update contact set   title = $1  where id = $2",[title,id]);
        res.json("contact is successfully updated"); 
    }catch(err){
        console.log(err.message);
    }
}

// delete todo
const delete_contact = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from contact where id=$1",[id]);
        res.json("contact is successfully deleted");
      
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    create_contact,contacts , contact , update_contact , delete_contact
}