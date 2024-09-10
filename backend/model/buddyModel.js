import supabase from "../config/database.js";

//REGISTRATION FUNCTIONS
//create buddy in buddy tbl 
export const createBuddy = async (userID, user) => {
    console.log("buddy model")
    try {
        // Use userID in your buddy creation logic
        //console.log(userID)
        const { data, error } = await supabase
            .from('tbl_buddy')
            .insert([
                { user_id: userID } // Insert the userID into the buddy table
            ])
            .select()

           
        if (error) {
            console.error("Error creating buddy:", error);
           // throw error; // Throw error if insertion fails
        } else {
            const buddyid = data[0]?.buddy_id
            createBuddyDetails(buddyid, user)
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        throw err;
    }
};

//create buddy in buddy details
export const createBuddyDetails = async (buddyid, user)=> {
    console.log("buddy model, buddy details")
    try{
        const {data, error} = await supabase
        .from ('tbl_buddy_details')
        .insert([
            {   buddy_id: buddyid,
                user_name: user.username,
                firstname: user.firstname,
                lastname: user.lastname, 
                dob: user.dob, 
                gender: user.gender, 
            }
        ])
        .select()

        if (error) {
            console.error("Error creating buddy:", error);
          //  throw error; // Throw error if insertion fails
        } 

        console.log("Buddy Details: ", data)
    }
    catch (err){
        console.log("Create buddy details error: ", err)
        throw err;
    }
}
export default createBuddy;