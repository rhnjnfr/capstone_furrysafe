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
        // res.json(data)
        // console.table(data);
        console.log("Data retrieved", data);
    }
};

export const validateUser = async (req, res) => {
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase 
        .from('tbl_user')
        .select('user_id, user_email, user_password')
        .eq('user_email', email)
        .eq('user_password', password);

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    
    if (data && data.length > 0) {
        // User found, return success
        res.status(200).json({ success: true, message: 'User validated successfully', user: data[0] });
    } else {
        // User not found or credentials don't match
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
};

export const createUser = async (req, res) =>{
    const { email, password } = req.body 
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const {data, error } = await supabase 
    .from('tbl_user')
    .insert([
        {user_email: email, user_password: hashedPassword }
    ]);

    if(error){
        if (error.code.match('23505')) { // PostgreSQL error code for unique violation
            console.log("Email already Exists")
        } else {
            console.error('Error inserting data:', error);
        }
    } else {
        console.log('Data inserted successfully');
    }
}
