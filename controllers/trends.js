const pool = require('../models/db')

//create a trend
const createtrend = async (req, res) => {
    console.log("create trend")
    try{
        const { body , link } = req.body;
        const user_id = req.user.id;
        const trend = await pool.query(
            "insert into trends (body,link,user_id) values($1,$2,$3)",[body,link,user_id]
        );

        res.json(trend[0])


    }catch(err){
        console.log(err.message);
    }
}
// get all todo
const trends = async (req,res) =>{
    try{
        
        const alltrends = await pool.query("select * from trends ORDER BY id DESC LIMIT $1",[10]);

        res.json(alltrends.rows);
    }catch(err){
        console.log(err.message);
    }
}

const trend= async (req,res) =>{
    try {
        
        const { id } = req.params;
        const trend = await pool.query("select * from trends where id = $1", [id]);
        res.json(trend.rows[0]);

        // const user_id = req.user.id;
        // if (trend.rows[0].user_id == user_id) {
        //     res.json(trend.rows[0]);
        // } else {
        //     res.json("")
        // }
    }catch(err){
        console.log(err.message);
    }
}

// update todo
const updatetrend = async (req,res) =>{
    try{
        const { id } = req.params;
        const { body , link } = req.body;
        pool.query("update trends set   body = $1 , link = $2  where id = $3",[body,link,id]);
        res.json("trend was updated"); 
        
    }catch(err){
        console.log(err.message);
    }
}

// delete todo
const deletetrend = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from trends where id=$1", [id]);
        res.json("trend was deleted!"); 

        
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    createtrend,trends,trend,updatetrend,deletetrend
}