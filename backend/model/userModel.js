import bcrypt from "bcrypt"
import supabase from "../config/database.js"

export const getUsers = async (req, res) => {
    const { data, error } = await supabase
        .from('tbl_user')
        .select('*');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
};

//check if user exist in DATABASE
export const validateUser = async (req, res) => {
    const { email, password } = req.body

    const { data, error } = await supabase 
        .from('tbl_user')
        .select('user_id, user_email, user_password')
        .eq('user_email', email);

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    if (data && data.length > 0) {
        //Compare salted hash password to input
        if(await bcrypt.compare(password, data[0].user_password)){
            //return success if salted-hash password is similar
            res.status(200).json({ success: true, message: 'User validated successfully', user: data[0] });
        }
    } else {
        // User not found or credentials don't match
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
};
//create user in DATABASE
export const createUser = async (req, res) =>{
    const { email, password } = req.body 
    
    //create a salted-hash password 
    const hashedPassword = await bcrypt.hash(password, 10)

    //save to DATABASE
    const {data, error } = await supabase 
    .from('tbl_user')
    .insert([
        {user_email: email, user_password: hashedPassword }
    ]);

    if(error){
        if (error.code.match('23505')) { // PostgreSQL error code for unique violation
            res.status(409).json({success: false, message: 'Email already exists'});
        } else {
            res.status(401).json({ success: false, message: 'Error Inserting Data' });
        }
    } else {
       res.status(200).json({success: true, message: 'User Successfully added', user: data});
    }
}
