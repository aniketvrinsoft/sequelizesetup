import User from "../models/User.model.js"
import { validationResult } from "express-validator"
import { printData } from "../utils/helper.js";
import bcrypt from 'bcrypt';
export const RegisterGET = (req,res) => {
    res.render('register',{title:"register"})

}


export const RegisterPOST = async(req,res) => {


    const error=validationResult(req)
    //console.log(error.mapped()['username'])


    if(!error.isEmpty()){
      return  res.render('register',{title:"register now",error:error.mapped(),printData:printData})
    }else{
        const {username,password}=req.body;
        try {
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser=await User.create({username:username,password:hashedPassword})
            //const all=await User.findAll();
            req.session.loggedin = true;
            req.session.user = newUser;
           return res.redirect('/home');
        } catch (error) {
            console.log(error)
            res.render('register',{title:'register now',errorMessage:"Username already exist"})
        }
        
    }
    res.render('register',{title:'register now'})
}

