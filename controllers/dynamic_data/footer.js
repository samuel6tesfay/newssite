const pool = require('../../models/db')

//create a footer
const create_footer = async (req,res) =>{
    try {
        
        const { about_us, city, country, email,
            phone, icon1, icon1link, icon2, icon2link,
            icon3,icon3link,icon4,icon4link,icon5,icon5link} = req.body;
        const user_id = req.user.id;
        const new_footer = await pool.query(
            "insert into footer (about_us, city, country, email,\
            phone, icon1, icon1link, icon2, icon2link,\
            icon3,icon3link,icon4,icon4link,icon5,icon5link,\
            user_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)", [about_us, city, country,
                                        email, phone, icon1, icon1link,
                                        icon2, icon2link, icon3, icon3link,
                                        icon4, icon4link, icon5, icon5link, user_id]
        );  

        res.json(new_footer[0])
        
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// get all todo
const footers = async (req,res) =>{
    try {

        const allfooters = await pool.query("select * from footer");
        res.json(allfooters.rows);
       
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}


// get a todo
const footer = async (req,res) =>{
    try{
        const { id } = req.params;
        const footer = await pool.query("select * from footer where id = $1", [id]);
        res.json(footer.rows[0]);

    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// update todo
const update_footer = async (req,res) =>{
    try{
        const { id } = req.params;
        const { about_us, city, country, email,
            phone, icon1, icon1link, icon2, icon2link,
            icon3,icon3link,icon4,icon4link,icon5,icon5link} = req.body;
        pool.query("update footer \
                    set  about_us = $1,city = $2,country = $3,email = $4,phone = $5,icon1 = $6,\
                    icon1link = $7,icon2 = $8,icon2link = $9,icon3 = $10,\
                    icon3link = $11,icon4 = $12,icon4link = $13,\
                    icon5 = $14,icon5link = $15 where id = $16", [about_us, city, country, email,
                                                                phone, icon1, icon1link, icon2, icon2link,
                                                                icon3,icon3link,icon4,icon4link,icon5,icon5link, id]);
        res.json("footer is successfully updated"); 
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

// delete todo
const delete_footer = async (req,res) =>{
    try{
        const { id } = req.params;
        pool.query("delete from footer where id=$1",[id]);
        res.json("footer is successfully deleted");
      
    } catch (err) {
        res.json("error");
        console.log(err.message);
    }
}

module.exports = {
    create_footer,footers , footer , update_footer , delete_footer
}