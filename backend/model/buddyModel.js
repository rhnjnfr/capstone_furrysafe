import supabase from "../config/database.js";

//REGISTRATION FUNCTIONS
//create buddy in buddy tbl 
export const createBuddy = async (userID) => {
    console.log("buddy model")
    try {
        // Use userID in your buddy creation logic
        const { data, error } = await supabase
            .from('tbl_buddy')
            .insert([
                { user_id: userID } // Insert the userID into the buddy table
            ])
            .select()

            const buddyid = data[0]?.buddy_id
        if (error) {
            console.error("Error creating buddy:", error);
            throw error; // Throw error if insertion fails
        } else {
            
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        throw err;
    }
};

//create buddy in buddy details
//export const createBuddyDetails = async (buddyid, )
export default createBuddy;