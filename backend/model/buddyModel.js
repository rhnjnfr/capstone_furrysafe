import supabase from "../config/database.js";

export const createBuddy = async (userID) => {
    console.log("buddy model")
    try {
        // Use userID in your buddy creation logic
        const { data, error } = await supabase
            .from('tbl_buddy')
            .insert([
                { user_id: userID } // Insert the userID into the buddy table
            ])
            .select

        if (error) {
            console.error("Error creating buddy:", error);
            throw error; // Throw error if insertion fails
        } else {
            //console.log("Buddy successfully created with userID:", userID);
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        throw err;
    }
};

export default createBuddy;