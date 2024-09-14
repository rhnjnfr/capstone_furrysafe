import bcrypt from "bcrypt"
import supabase from "../config/database.js"
import { createBuddy } from "./buddyModel.js"
import { createShelter, verifyShelter } from "./shelterModel.js";

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
                .eq('user_id', userID);
            
                
            //nothing is returned from shelter
            if (shelterError) {
                console.log("shelter error:")
                res.status(500).json({ error: shelterError.message });
                return;
            }
        
            //user is shelter 
            if (shelterData && shelterData.length > 0) {
                const verificationResult = await verifyShelter(userID); 

                if (verificationResult.success) {
                    // Shelter is verified
                    res.status(200).json({ success: true, message: 'User validated and shelter verified successfully', userType: 'shelter', user: user });
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
    const { user, regtype, files} = req.body 
    const hashedPassword = await bcrypt.hash(user.password, 10) //create a salted-hash password 

    // user to user tbl
    const {data, error } = await supabase 
    .from('tbl_user')
    .insert([
        {user_email: user.email, user_password: hashedPassword }
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
            await createShelter(userID, user, files); //user holds all user detials
        }
       res.status(200).json({success: true, message: 'User Successfully added', user: data});
    }
};

