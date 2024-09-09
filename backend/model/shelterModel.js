import supabase from "../config/database.js";

//REGISTRATION FUNCTIONS
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
    //console.log("shelter model: create details: ", shelterName, shelterId)
    try{
        const {data, error} = await supabase
        .from('tbl_shelter_details')
        .insert([
            {shelter_id: shelterId, shelter_name: shelterName}
        ])
    }
    catch(err){
        console.log("error in shelter model, creating shelter details: ", err)
    }
}

//save documents to documents tbl 

//LOGIN FUNCTIONS 
//verify if shelter is verified 
export const verifyShelter = async (userID)=>{
    try{
        //console.log("verify shelter with id: ", userID); 
        const {data, error} = await supabase 
        .from('tbl_shelter')
        .select('verified')
        .eq('user_id', userID)

        const shelter_status = data[0]?.verified
        if(shelter_status == true){
            console.log(true)
        }
        else{
            console.log("titeshdfhkga")
        }
    }
    catch(err){
        console.log("error in verifying shelter: ", err);
        throw err; 
    }
}
export default createShelter;    
