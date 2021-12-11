const pool = require('../../models/db')

//create a admin_header
const create_admin_header = async (req,res) =>{
    try {
        
        const { logo, logolink, menu1, menu1link, menu2, menu2link} = req.body;
        const user_id = req.user.id;
        const new_admin_header = await pool.query(
            "insert into admin_header (logo,logolink,menu1,menu1link,menu2,menu2link,user_id)\
            values($1, $2, $3, $4, $5, $6, $7)",
            [logo, logolink, menu1, menu1link, menu2, menu2link,  user_id]
        );  

        res.json(new_admin_header[0])
        
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// get all todo
const admin_headers = async (req,res) =>{
    try {

        const alladmin_headers = await pool.query("select * from admin_header");
        res.json(alladmin_headers.rows);
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}


// get a todo
const admin_header = async (req,res) =>{
    try{
        const { id } = req.params;
        const admin_header = await pool.query("select * from admin_header where id = $1", [id]);
        res.json(admin_header.rows[0]);

    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// update todo
const update_admin_header = async (req,res) =>{
    try{
        const { id } = req.params;
        const { logo, logolink, menu1, menu1link,
            menu2, menu2link} = req.body;
                pool.query("update admin_header set   logo = $1 , logolink = $2 , menu1 = $3 ,menu1link = $4,menu2 = $5 ,menu2link = $6 where id = $7",[logo, logolink, menu1, menu1link, menu2, menu2link,id]);
        res.json("admin_header is successfully updated"); 
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete todo
const delete_admin_header = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from admin_header where id=$1",[id]);
        res.json("admin_header is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    create_admin_header,admin_headers , admin_header , update_admin_header , delete_admin_header
}