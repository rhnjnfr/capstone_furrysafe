import supabase from "../config/database.js";

//create shelter (saves User_ID, and retrieves Shelter_id)
export const createShelter = async (userID, shelter_name, req, res)=> {
    console.log("shelter model")
    try{
        const {data, error} = await supabase 
            .from('tbl_shelter')
            .insert([
                {user_id: userID}
            ])
            .select()
        
            const shelterid = data[0]?.shelter_id;
            //console.log("shelter model data", data)
            if(error){
                console.error("error creating user:", error)
                throw error; 
            }else{
                //console.log("Siccessfully created buddy with userid: ", userID, " Shelter id: ", shelterid, shelter_name)
                createShelterDetails(shelterid, shelter_name)
            }
    }
    catch(err){
        console.log("error in shelter model: ", err);
        throw err;
    }
}

//create shelter details 
export const createShelterDetails = async (shelterId, shelterName, req, res)=> {
    console.log("shelter model: create details: ", shelterName, shelterId)
}
export default createShelter;