import bcrypt from "bcrypt"
import supabase from "../config/database.js"
import { createBuddy } from "./buddyModel.js"
import { createShelter, verifyShelter } from "./shelterModel.js";

//check if user credentials exist in DATABASE
export const validateUser = async (req, res) => {
    try{
        const { email, password } = req.body

    const { data, error } = await supabase 
        .from('tbl_user')
        .select('user_id, user_email, user_password')
        .eq('user_email', email);

    if (error) {
        console.log("retrieve failed")
        res.status(500).json({ error: error.message });
        return;
    }

    // if (data && data.length > 0) {
    //     //Compare salted hash password to input
    //     if(await bcrypt.compare(password, data[0].user_password)){
    //         //return success if salted-hash password is similar
    //         res.status(200).json({ success: true, message: 'User validated successfully', user: data[0] });
    //     }
    // } else {
    //     // User not found or credentials don't match
    //     res.status(401).json({ success: false, message: 'Invalid email or password' });
    // }

    console.log("data", data)
    if (data && data.length > 0) {
        const user = data[0];

        // Compare salted hash password to input
        const passwordMatch = await bcrypt.compare(password, user.user_password);
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        
        // Step 2: Check which table the user belongs to - shelter or buddy
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
            console.log("buddy error:")
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
//create user in DATABASE
export const createUser = async (req, res) =>{
    const { email, password, regtype } = req.body 
    console.log("user model req body data: ", req.body.data)
    //create a salted-hash password 
    const hashedPassword = await bcrypt.hash(password, 10)

    //save to USER DATABASE
    const {data, error } = await supabase 
    .from('tbl_user')
    .insert([
        {user_email: email, user_password: hashedPassword }
    ])
    .select()

    if(error){
        if (error.code.match('23505')) { // PostgreSQL error code for unique violation
            res.status(409).json({success: false, message: 'Email already exists'});
        } else {
            res.status(401).json({ success: false, message: 'Error Inserting Data' });
        }
    } else {
        //sample logic
        const userID = data[0]?.user_id;
        //console.log(userID)
        if(regtype.match("buddy")){
            //console.log("buddy")
            await createBuddy(userID);
        }
        else{
            //console.log("shelter")
            const { shelter_name } = req.body
            //console.log("usermodel sheltername: ", shelter_name)
            await createShelter(userID, shelter_name);
        }
       res.status(200).json({success: true, message: 'User Successfully added', user: data});
    }
};

