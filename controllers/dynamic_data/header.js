const pool = require('../../models/db')

//create a header
const create_header = async (req,res) =>{
    try {
        
        const { logo, logolink, menu1, menu1link, menu2, menu2link,
               menu3, menu3link} = req.body;
        const user_id = req.user.id;
        const new_header = await pool.query(
            "insert into header (logo,logolink,menu1,menu1link,menu2,menu2link,menu3,menu3link,user_id)\
            values($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [logo, logolink, menu1, menu1link, menu2, menu2link, menu3, menu3link, user_id]
        );  

        res.json(new_header[0])
        
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// get all todo
const headers = async (req,res) =>{
    try {

        const allheaders = await pool.query("select * from header");
        res.json(allheaders.rows);
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}


// get a todo
const header = async (req,res) =>{
    try{
        const { id } = req.params;
        const header = await pool.query("select * from header where id = $1", [id]);
        res.json(header.rows[0]);

    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// update todo
const update_header = async (req,res) =>{
    try{
        const { id } = req.params;
        const { logo, logolink, menu1, menu1link,
            menu2, menu2link ,menu3, menu3link} = req.body;
                pool.query("update header set   logo = $1 , logolink = $2 , menu1 = $3 ,menu1link = $4,menu2 = $5 ,menu2link = $6, menu3 = $7 ,menu3link = $8, where id = $9",[logo, logolink, menu1, menu1link, menu2, menu2link, menu3, menu3link,id]);
        res.json("header is successfully updated"); 
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete todo
const delete_header = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from header where id=$1",[id]);
        res.json("header is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    create_header,headers , header , update_header , delete_header
}