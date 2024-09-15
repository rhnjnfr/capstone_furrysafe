import bcrypt from "bcrypt"
import supabase from "../config/database.js"
import { createBuddy } from "./buddyModel.js"
import { createShelter, verifyShelter } from "./shelterModel.js";
import { createToken } from "../middleware/jwt.js"

//LOGIN | check if user credentials exist in DATABASE
export const validateUser = async (req, res) => {
    try{
        const { email, password } = req.body

        const { data, error } = await supabase 
            .from('tbl_user')
            .select('user_id, user_email, user_password')
            .eq('user_email', email);

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        //if something is retrieved from user  table, then will check shelter and buddy table
        if (data && data.length > 0) {
            const user = data[0];

                const passwordMatch = await bcrypt.compare(password, user.user_password); // Compare salted hash password to input
                if (!passwordMatch) {
                    res.status(401).json({ success: false, message: 'Invalid email or password' });
                    return;
            }

            const userID = user.user_id;

            const { data: shelterData, error: shelterError } = await supabase
                .from('tbl_shelter')
                .select('shelter_id')
                .eq('user_id', userID)
                .select() //select data retrieved from users table
                
            //nothing is returned from shelter
            if (shelterError) {
                res.status(500).json({ error: shelterError.message });
                return;
            }
        
            //user is shelter 
            if (shelterData && shelterData.length > 0) {
                const verificationResult = await verifyShelter(userID); //check if shelter is document verified

                if (verificationResult.success) {
                    // Shelter is verified
                    // res.status(200).json({ success: true, message: 'User validated and shelter verified successfully', userType: 'shelter', user: user });
                    const token = generateToken({ userID, userType: 'shelter' });

                    res.status(200).json({ 
                        success: true, 
                        message: 'User validated and shelter verified successfully', 
                        userType: 'shelter', 
                        token 
                    });
                    return;
                } else {
                    // Shelter is not verified
                    res.status(403).json({ success: false, message: 'Shelter is not verified' });
                    return;
                }
            }
        
            // If not found in sheltertbl, check buddytbl
            const { data: buddyData, error: buddyError } = await supabase
                .from('tbl_buddy')
                .select('buddy_id')
                .eq('user_id', userID);

        
            if (buddyError) {
                res.status(500).json({ error: buddyError.message });
                return;
            }
        
            if (buddyData && buddyData.length > 0) {
            // User is a buddy
                const token = generateToken({ userID, userType: 'buddy' });

                res.status(200).json({ 
                    success: true, 
                    message: 'User validated successfully', 
                    userType: 'buddy', 
                    token 
                });
                res.status(200).json({ success: true, message: 'User validated successfully', userType: 'buddy', user: user });
                return;
            }
        
            // If the user is not found in either table, consider it an error
            res.status(401).json({ success: false, message: 'User type not determined' });
        
        } else {
            // User not found or credentials don't match
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    }catch(err){
        console.log("error in verifying user", err)
    }
};

//REGISTRATION | create user in DATABASE
export const createUser = async (req, res) =>{

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        username: req.body.username
    }


    const password = req.body.password
    const email = req.body.email
    const regtype = req.body.regtype

    const sheltername = req.body.sheltername
    const documents = req.files 

    const hashedPassword = await bcrypt.hash(password, 10) //create a salted-hash password 

    // user to user tbl
    const {data, error } = await supabase 
    .from('tbl_user')
    .insert([
        {user_email: email, user_password: hashedPassword }
    ])
    .select() //retrieve created row

    if(error){
        if (error.code.match('23505')) { // PostgreSQL error code for unique violation
            res.status(409).json({success: false, message: 'Email already exists'});
        } else {
            res.status(401).json({ success: false, message: 'Error Inserting Data' });
        }
    } else {
        //sample logic
        const userID = data[0]?.user_id; //retrieves userid from data
        if(regtype.match("buddy")){
            await createBuddy(userID, user); //user holds all user detials
        }
        else{
            await createShelter(userID, sheltername, documents); 
        }
       res.status(200).json({success: true, message: 'User Successfully added', user: data});
    }};

