import supabase from "../config/database.js";
import bcrypt from "bcrypt";

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

export default addShelterAddress;