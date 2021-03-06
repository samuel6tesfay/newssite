require('dotenv').config();

const pool = require('../models/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60
const createToken = (id, isAdmin) => {
    Id = id 
    IsAdmin = { isAdmin }
    return jwt.sign(
        {
            id,
            isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
}

validateUser = (user) =>{
   
    var errors = [];

    if (!user.name || !user.email || !user.password) {
        errors.push({ message: "Please enter all fields" });
    }

    if (user.password.length < 6) {
        errors.push({ message: "Password must be a least 6 characters long" });
      }

    if(errors.length > 0){
        return false;
        
    }else{
        return true;
    }

}

const signup = async (req,res) => {
    try {

        if (validateUser(req.body)) {

            const {name , email , password , isadmin} = req.body;

            const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
            if(checkEmail.rows.length == 0){
                hashedPassword = await bcrypt.hash(password,10);
                await pool.query("insert into users (name,email,password,isadmin) values($1,$2,$3,$4)",[name,email,hashedPassword,isadmin]);
                res.json("succ...");
            }else{
                res.json("email already exist")
            }
            
        } else {
            res.json("error");
            errors = []
        }
        
    } catch (err) {
        res.json("error")
    }
}

const login = async (req, res) => {

    
    try {

        const { email, password } = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
        // console.log(user);
        if (user.rows.length > 0) {
            
            console.log("login enter");
            
            try {
                const auth = await bcrypt.compare(password, user.rows[0].password);
                if (auth) {
                    // console.log(user.rows[0])
                    const token = createToken(user.rows[0].id ,  user.rows[0].isadmin );
                    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    // res.cookie('userInfo', token, { maxAge: maxAge * 1000 });
                    // res.json(token);
                    res.send({'userInfo':token})
                    res.json({ id:user.id,isAdmin:user.isAdmin });
                }
                else {
                    res.json("enter correct password");

                }
            }catch(err){
                res.json(err);
            }
        }
        
        res.json("enter correct email");
    } catch (err) {
        res.json("error");

    }
}

const loginget = async(req,res) =>{
    res.json("fill email and password ")
}

const logout = (req,res) => {
    res.cookie('userInfo',"",{ maxAge: 1 });
    res.redirect('/login');
}

module.exports = {
    signup, login ,logout,loginget
}