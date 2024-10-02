import supabase from "../config/database.js";
import bcrypt from "bcrypt";
import multer from "multer"

//cloud storage used for saving images 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); 
    },
    filename: (req, file, cb) =>{
        cb(null, date.now() + '-' + file.originalname);
    }
})

//newly logged in after shelter verificaion (adds a new address to the shelter)
export const addShelterAddress = async (req, res) => {
    try {
        const { address, latitude, longitude, id} = req.body
       const {data, err} = await supabase.rpc('insert_shelter_address',
        {
            _shelter_address: address,
            _lat: latitude, 
            _lng: longitude,
            _shelterid: id

        })
        if (err) {
            console.log("Error:", err);
        } else {
            return res.status(200).json({
                "success": true
              });
        }

    } catch (err) {
        console.log("An error occurred while saving address", err);
        res.status(500).send("Server Error");
    }
};
//retrieves shelter profile details (tbl_shelter, tbl_shelter_details, tbl_shelter_link)
export const retrieveShelterDetails = async (req, res) => {
    try{
        const { shelterid } = req.body
        const { data, error } = await supabase.rpc('retrieve_shelter_details',
            {
                _shelterid: shelterid
            })
        if (error) {
            console.log("Error:", error);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("an error occured retrieving shelter details", err)
    }
}
//retrieves profile picture from cloud storage (bucket (images))
export const retrieveProfile = async (req, res) => {
    try{
        const { profileUrl } = req.body
        
        const { data: imageData, error } = supabase
            .storage
            .from('images')
            .getPublicUrl(profileUrl);

        if (error) {
            console.error('Error getting public URL:', error);
        } else {
            res.status(200).send({ data: imageData.publicUrl, message: "Shelter details saved successfully" });
        }
    }
    catch(err) {
        
    }
}
//save modified shelter details and links
export const saveShelter_and_Link = async (req, res) => {
    try {
        const { shelterid, sheltername, shelteraddress, image,
            contact, email, latitude, longitude, bio, links } = req.body;
        const file = req.file;
        let filePath = null

        // Check if the file is uploaded
        if (file) {
            filePath = `user_images/${Date.now()}_${file.originalname}`;

            // Upload file to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                });

            if (uploadError) {
                console.error("Upload error:", uploadError);
                return res.status(500).send({ message: "File upload failed" });
            }
        }
        else{
            filePath = image
        }

        let linksArray;
            if (Array.isArray(links)) {
                // If links is already an array
                linksArray = links;
            } else if (typeof links === 'string') {
                try {
                    // Try parsing if it's a JSON-formatted string
                    const parsedLinks = JSON.parse(links);
                    if (Array.isArray(parsedLinks)) {
                        linksArray = parsedLinks;
                    } else {
                        // If parsing doesn't yield an array, treat it as a single link
                        linksArray = [links];
                    }
                } catch (e) {
                    // If parsing fails, assume it's a single link
                    linksArray = [links];
                }
            } else {
                // If links is neither an array nor a string, default to an empty array
                linksArray = [];
            }

            let contactValue;
            if (contact === '') {
                contactValue = null; // Convert empty string to null
            } else if (typeof contact === 'string') {
                contactValue = parseInt(contact); // Convert string to integer
                if (isNaN(contactValue)) {
                    contactValue = null; // Set to null if conversion fails
                }
            } else {
                contactValue = contact; // Leave as is if it's already a number
            }

        // Call the RPC function to update shelter details
        const { data: rpcData, error: rpcError } = await supabase.rpc('update_shelter_details', {
            _id: parseInt(shelterid, 10),
            _sheltername: sheltername,
            _address: shelteraddress,
            _lat: latitude,
            _lng: longitude,
            _contact: contactValue,
            _email: email,
            _profileurl: filePath, // store uploaded file path
            _bio: bio,
            _links: linksArray 
        });

        if (rpcError) {
            console.error("Database insert error:", rpcError);
            return res.status(500).send({ success: false, message: "Failed to save shelter details" });
        }

        console.log("Database insert success");
        res.status(200).send({ success: true, message: "Shelter details saved successfully" });

    } catch (err) {
        console.log("Save Shelter Details and Link Error:", err);
        res.status(500).send({ message: "Internal server error" });
    }
};
//retrieve pet details and EVERYTHING KATUNG FOCKING 14??? TABLE QUERY
export const retrievePetProfile = async (req, res) => {
    const { _userid, _petid } = req.body

    try{
        const { data, error } = await supabase.rpc('retrieve_pet_profiles', {
            _user_id: _userid,
            _pet_id: _petid
        })
        if (error) {
            console.log("Error:", error);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("Error occured when retrieving pet profiles")
    }
}
//retrieve pet breed
export const retrievePetBreed = async (req, res) => {
    const {_category_id} = req.body
    try{
        const {data, err} = await supabase.rpc('retrieve_pet_breed', {
            _pet_type: _category_id
        })
        if (err) {
            console.log("Error:", err);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error retrieving pet breed", err)
    }
}
//retrieve vaccine category
export const retrieveVaccineCategory = async (req, res) => {
    const {_category_id} = req.body
    try{
        const {data, err} = await supabase.rpc('retrieve_pet_vaccine', {
            _pet_type: _category_id
        })
        if (err) {
            console.log("Error:", err);
        } else {
            console.table(data)
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error in retrieving vaccine", err)
    }
}
//retrieve sterilization
export const retrieveSterilization = async (req, res) =>{
    const { _gender } = req.body
    try{
        const {data, err} = await supabase.rpc('retrieve_sterilization', {
            _gender: _gender
        })
        if (err) {
            console.log("Error:", err);
        } else {
            console.table(data)
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log(err)
    }
}
//retrieve pet status
export const retrievePetStatus = async (req, res) =>{
    try{
        const {data, err} = await supabase.rpc('retrieve_pet_status')
        if (err) {
            console.log("Error:", err);
        } else {
            console.table(data)
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error retrieving pet status", err)
    }
}
export default addShelterAddress;