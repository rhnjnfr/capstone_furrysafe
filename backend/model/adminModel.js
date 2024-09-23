import supabase from "../config/database.js"

export const getShelterRequests = async(req, res)=>{
    try{
        const {mode} = req.body
        
        const {data, err} = 
        await supabase.rpc('get_shelter_requests', {p_status: mode})

        if (err) {
            console.log("an error occurred when getting shelter requests", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(data);
    }
    catch(err){
        console.log("an error occured when getting shelter requests", err)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getShelterRequestsDetails = async (req, res) => {
    const id = req.params.id
    // console.log("shelter details model")
    try{
        const {data, err} = 
        await supabase.rpc('get_shelter_requests_details', { shelter_id_input:  id}) //, { id: 1 }

        if (!data || data.length === 0) {
            // If no data found, return 404
            //return res.status(404).send({ message: 'Request not found' });
        }

        if (err) {
            console.log("an error occurred when getting shelter requests", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(data);
    }
    catch(err){
        console.log("error", err)
    }
}

//Documents in general jd gina retrieve ani
export const getImage = async (req, res) => {
    try{
        const { document_1, document_2 } = req.query;

        const { data: urlData1, error: error1 } = supabase.storage
            .from('images')
            .getPublicUrl(`${document_1}`);

        const { data: urlData2, error: error2 } = supabase.storage
            .from('images')
            .getPublicUrl(`${document_2}`);

        // Check for errors in either request
        if (error1 || error2) {
            console.error("Error occurred while fetching images", error1 || error2);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ image1: urlData1, image2: urlData2 });
    }
    catch(Err){
        console.log("error getting image", Err)
    }
}

export const update_reviewFunction = async (req, res) => {
    try{
        const {id, req_status, req_response, admin_id } = req.body 
        
        const { data, error } = await supabase
        .rpc('update_shelter_request', { 
            verified_status: req_status, verification: req_response, s_id: id, reviewer_id: admin_id 
        });

        if(error){
            console.log("u stupid", error)
        }
        else {
            console.log('Shelter verified:');
        }
    }
    catch(err){
        console.log("error getting image", err)
    }
}

export const statusDisplay = async (req, res)=>{
    try{
        const {data, err} = await supabase.rpc('countstatus')
        if (err) {
            console.log("Error:", err);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error", err)
    }
}