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
        console.log(errors)
        return false;
        
    }else{
        return true;
    }

}

const signup = async (req,res) => {
    try {
        console.log("123")

        console.log(req.body)
        if (validateUser(req.body)) {

            const {name , email , password , isadmin} = req.body;

            const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
            console.log(checkEmail.rows);
            if(checkEmail.rows.length == 0){
                hashedPassword = await bcrypt.hash(password,10);
                await pool.query("insert into users (name,email,password,isadmin) values($1,$2,$3,$4)",[name,email,isadmin,hashedPassword]);
                res.status(201);
            }else{
                res.json("email already exist")
            }
            
        } else {
            res.json("error");
            errors = []
        }
        
    } catch (err) {
        res.json("error")
        console.log(err.message);
    }
}

const login = async(req,res) => {
    
    try{
        const { email, password } = req.body;
        console.log(req.body);
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])

        if (user.rows.length > 0) {
            
            console.log("login enter");
            
            try {
                const auth = await bcrypt.compare(password, user.rows[0].password);
                if (auth) {
                    console.log(user.rows[0])
                    const token = createToken(user.rows[0].id ,  user.rows[0].isadmin );
                    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.cookie('userInfo', token, { maxAge: maxAge * 1000 });
                    // res.json(token);
                    res.send({'userInfo':token})
                    res.status(200);

                    res.status(200).json({ id:user.id,isAdmin:user.isAdmin });
                }
                else {
                    res.json("error");

                }
            }catch(err){
                res.json(err);
            }
        }
        
        res.json('users login');
    } catch (err) {
        res.json("error");
        console.log(err.message);

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