import supabase from "../config/database.js"

export const getUsers = async (req, res) => {
    const { data, error } = await supabase
        .from('tbl_user')
        .select('*');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
        console.table(data);
    }
};