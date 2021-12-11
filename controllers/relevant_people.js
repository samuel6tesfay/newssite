const pool = require('../models/db')

//create a todo
const createrelevant_people = async (req,res) =>{
    try{
        const { name , body , link } = req.body;
        // const admin_id = req.admin_id.id;
        const user_id = req.user.id;
        const newrelevant_people = await pool.query(

            "insert into relevant_people (name,body,link,user_id) values($1,$2,$3,$4)",[name,body,link,user_id]
        );
        res.json(newrelevant_people[0])
        
    } catch (err) {
        res.json('error');
        console.log(err.message);
    }
}
// get all todo
const relevant_peoples = async (req,res) =>{
    try{
       const allrelevant_peoples = await pool.query("select * from relevant_people ORDER BY id DESC LIMIT $1",[20]);
        res.json(allrelevant_peoples.rows);
    } catch (err) {
        res.json('error');
        console.log(err.message);
    }
}

// get a todo
const relevant_people = async (req,res) =>{
    try{
        const { id } = req.params;
        const relevant_people = await pool.query("select * from relevant_people where id = $1", [id]);
        res.json(relevant_people.rows[0]);
    } catch (err) {
        res.json('error');
        console.log(err.message);
    }
}

// update todo
const updaterelevant_people = async (req,res) =>{
    try{
        const { id } = req.params;
        const { name , body,link } = req.body;
        pool.query("update relevant_people set name = $1 , body  = $2 , link = $3  where id = $4",[name,body,link,id]);
        res.json("relevant_peoples was updated"); 
    } catch (err) {
        res.json('error');
        console.log(err.message);
    }
}

// delete todo
const deleterelevant_people = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from relevant_people where id=$1", [id]);
        res.json("relevant_people was deleted!"); 
       
    } catch (err) {
        res.json('error');
        console.log(err.message);
    }
}

module.exports = {
    createrelevant_people,relevant_peoples , relevant_people , updaterelevant_people , deleterelevant_people
}