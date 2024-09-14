import supabase from "../config/database.js";
import multer from "multer"
import fs from "fs"
import paht from "path"

//moved img/docu upload for better access 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'documents/'); 
    },
    filename: (req, file, cb) =>{
        cb(null, date.now() + '-' + file.originalname);
    }
})
const upload = multer ({storage}); 

const uploadDocument = async (req, res)=>{
    const files = req.files;
    try{
        const uploadResults = [];
        for (const file of files){
            const filePath = path.join(__dirname, '../images/documents', file.filename);
            const fileContent = fs.readFileSync (filePath);

            const {data, error} = await supabase.storage 
            .fromt('images')
            .upload(file.filename, fileContent,{
                constentType: file.mimetype
            })

            if (error) throw error;

            uploadResults.push(data);
      
            // Clean up the file from the server
            fs.unlinkSync(filePath);
        }
    }
    catch(err){
        res.status(500).json({ error: error.message });
    }
}

//REGISTRATION FUNCTIONS

//create shelter in shelter tbl 
// files (image) is still testing 
export const createShelter = async (userID, shelter, files, req, res)=> {
    console.log("shelter model, create shelter")
        console.log(files)
    try{
        const {data, error} = await supabase 
            .from('tbl_shelter')
            .insert([
                {user_id: userID}
            ])
            .select() //retrieves create row in shelter
        
            const shelterid = data[0]?.shelter_id;
            if(error){
                console.error("error creating user:", error)
                throw error; 
            }else{
                createShelterDetails(shelterid, shelter.sheltername)
                console.log("Files to be uploaded:", files); //image testing
                //saveDocuments(shelterid, files) //image testing
            }
    }
    catch(err){
        console.log("error in shelter model: ", err);
        throw err;
    }
}

//create shelter details 
export const createShelterDetails = async (shelterId, shelterName, req, res)=> { 
    //create shelter details and shelter documents are created at the same time
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
export const saveDocuments = async (shelterid, files) => { //image testing
    //create shelter details and shelter documents are created at the same time
    try{      
        if (!files || files.length === 0){
            console.log("No files to upload");
            return;
        }
        
        for (const file of files) {

            if (!file || !file.name) {
                console.log("Invalid file detected:", file);
                continue;
            }

            const { data, error } = await supabase.storage
                .from('images')
                .upload(`public/${Date.now()}_${file.name}`, file); // Using the actual File object

            if (error) {
                console.log("Image upload failed", error);
            } else {
                console.log("Successfully uploaded:", file.name);
            }
        }
    }
    catch(err){
        console.log("error in saving documents", err)
    }
}

//LOGIN FUNCTIONS 
export const verifyShelter = async (userID, req, res)=>{ //verify if shelter is verified 
    try{
        const {data, error} = await supabase  
        .from('tbl_shelter')
        .select('verified')
        .eq('user_id', userID)

        const shelter_status = data[0]?.verified
        if(shelter_status == true){
            return { success: true };
        }
        else{
            return { success: false };
        }
    }
    catch(err){
        console.log("error in verifying shelter: ", err);
        throw err; 
    }
}
export default createShelter;    
